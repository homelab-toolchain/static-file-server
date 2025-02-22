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

Run the following command with your parameters (replace `port` and `rootFolder` with your values):

```
curl -sSL https://raw.githubusercontent.com/homelab-toolchain/static-file-server/refs/heads/main/install.sh | bash -s port=8080 rootFolder=/DATA
```

**Note:** <br>
* `rootFolder` specifies the starting folder for file browsing
* `port` sets the port on which the static file server will be accessible

# Screenshots

**Landing Page (you have defined)**:
![screenshot_1](https://github.com/user-attachments/assets/456573f3-0172-4870-a616-59672155a2a6)

**Possibility to get the URL of the file:**
![screenshot_2](https://github.com/user-attachments/assets/146c08e0-3f00-45e6-aa31-f5ac56549c44)