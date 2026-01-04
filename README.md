<h1 align="center">Simple Static File Server</h1>
<p align="center">
<a href="#">
<img src="https://img.shields.io/github/last-commit/homelab-toolchain/static-file-server/main?style=for-the-badge&label=last%20update&display_timestamp=committer"/>
</a>
</p>

---

# General

Containerized static file server for quickly browsing a host folder and copying direct links to files.

## Requirements
- Docker installed on the host (Docker Compose if you prefer Compose).
- Internet access to pull the image and download helper scripts.
- Root privileges when using the install script (it writes to `/homelab-toolchain/static-file-server` and manages Docker).
- `curl` available on the host (`apt-get update -y && apt-get install curl -y` on Debian/Ubuntu).

## Configuration
- `port`: host port where the server will be exposed. Container listens on `8080`.
- `homeFolder`: absolute path on the host to serve and browse. It is mounted to `/home` in the container.

## Quick Start (Install Script)
The script downloads the Compose file and upgrade helper to `/homelab-toolchain/static-file-server`, writes a `.env` file, and starts the container.

```bash
curl -sSL https://raw.githubusercontent.com/homelab-toolchain/static-file-server/refs/heads/main/install.sh | bash -s port=8080 homeFolder=/DATA
```

Replace `port` and `homeFolder` with your values.

## Manual Deployment
### Docker Run
```bash
docker run -d \
  --name static-file-server \
  -p ${PORT}:8080 \
  --restart always \
  -v ${HOME_FOLDER}:/home \
  ghcr.io/homelab-toolchain/static-file-server:latest
```

### Docker Compose
Create `.env` with `PORT` and `HOME_FOLDER`, then:
```bash
curl -sSL -o docker-compose.yml https://raw.githubusercontent.com/homelab-toolchain/static-file-server/refs/heads/main/docker-compose.yml
docker compose up -d
```

## Upgrading
If you installed via the script, an upgrade helper is placed at `/homelab-toolchain/static-file-server/upgrade.sh`:
```bash
source /homelab-toolchain/static-file-server/upgrade.sh
```
Manual deployments can be refreshed with `docker compose pull && docker compose up -d` or `docker pull ghcr.io/homelab-toolchain/static-file-server:latest`.

## Screenshots
**Landing page (home folder you defined):**
![screenshot_1](https://github.com/user-attachments/assets/69a3c53f-6fd6-4cc0-a95b-dc1dbc95aa1f)

**Copy the URL of a file:**
![screenshot_2](https://github.com/user-attachments/assets/c4d1bee7-7247-420f-8610-ec9439f7ada1)
