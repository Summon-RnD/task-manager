#!/usr/bin/env python3
"""TaskBoard server: static files + SQLite-backed board API."""

import argparse
from pathlib import Path

from flask import Flask, jsonify, request, send_from_directory

import db

ROOT = Path(__file__).resolve().parent

app = Flask(__name__, static_folder=str(ROOT), static_url_path="")


@app.get("/api/board")
def api_get_board():
    board, updated_at = db.get_board()
    return jsonify({**board, "updated_at": updated_at})


@app.put("/api/board")
def api_put_board():
    payload = request.get_json(silent=True)
    if not isinstance(payload, dict):
        return jsonify({"error": "expected JSON object"}), 400
    required = ("people", "tasks")
    missing = [k for k in required if k not in payload]
    if missing:
        return jsonify({"error": f"missing fields: {', '.join(missing)}"}), 400
    board = {
        "people": payload["people"],
        "tasks": payload["tasks"],
        "clients": payload.get("clients", []),
        "hardware_vocab": payload.get("hardware_vocab", []),
        "domain_rules": payload.get("domain_rules", []),
        "uid": payload.get("uid", 0),
        "today": payload.get("today"),
    }
    updated_at = db.put_board(board)
    return jsonify({"ok": True, "updated_at": updated_at})


@app.get("/api/health")
def api_health():
    return jsonify({"ok": True})


@app.get("/")
def index():
    return send_from_directory(ROOT, "index.html")


@app.get("/<path:path>")
def static_files(path):
    target = ROOT / path
    if target.is_file():
        return send_from_directory(ROOT, path)
    return send_from_directory(ROOT, "index.html")


def main():
    parser = argparse.ArgumentParser(description="Run the TaskBoard server")
    parser.add_argument("--host", default="0.0.0.0")
    parser.add_argument("--port", type=int, default=8090)
    args = parser.parse_args()
    db.init_db()
    app.run(host=args.host, port=args.port, debug=False)


if __name__ == "__main__":
    main()
