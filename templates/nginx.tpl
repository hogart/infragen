upstream ${appName} {
    server ${ip}:${port};
}

server {
    set $apppath ${rootPath}; # set variable so it can be used later

    listen 80;
    access_log /var/log/nginx/${appName}.log;
    server_name ${domain};

    root $apppath;

    # styles and scripts
    location ~ /css|js/ {
        root $apppath/public/static/;
        gzip on;
        gzip_static on;
        gzip_types text/css application/x-javascript;
        gzip_proxied no-store no-cache private expired auth;
    }

    # images
    location ~ /img/ {
        root $apppath/public/img/;
        gzip on;
        gzip_static on;
        gzip_types image/png image/svg+xml image/gif image/jpeg;
        gzip_proxied no-store no-cache private expired auth;
    }

    # when server is down, show this page
    error_page 502 /502.html;
    location /502.html {
        root $apppath/public/static;
    }

    location / {
        proxy_pass http://${appName}/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
        proxy_redirect off;
    }
}