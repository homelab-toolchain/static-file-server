# General

This script installs a static file server that allows you to browse files and quickly have file links for use in your applications.

# Prerequsites

1. Internet connection.
2. Log in as root.
3. Docker and Docker Compose.
4. Install `curl` or just call the following command:
```
apt-get update -y && apt-get install curl -y
```

# How to Execute

Run the following command with your parameters (replace `port` and `homeFolder` with your values):

```
curl -sSL https://raw.githubusercontent.com/homelab-toolchain/static-file-server/refs/heads/main/install.sh | bash -s port=8080 homeFolder=/DATA
```

**Note:** <br>
* `homeFolder` specifies the starting folder for file browsing
* `port` sets the port on which the static file server will be accessible

# Screenshots
 
**Landing Page (home folder you have defined)**:
![screenshot_1](https://github.com/user-attachments/assets/69a3c53f-6fd6-4cc0-a95b-dc1dbc95aa1f)

**Possibility to get the URL of the file:**
![screenshot_2](https://github.com/user-attachments/assets/c4d1bee7-7247-420f-8610-ec9439f7ada1)
