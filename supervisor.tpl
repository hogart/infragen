[program:${appName}]
command=${command || rootPath + '/bin/www'}
autostart=true
autorestart=true
environment=NODE_ENV=${env}
stderr_logfile=${rootPath}/logs/err.log
stdout_logfile=${rootPath}/logs/out.log
user=${user}

[eventlistener:crashmail]
command=/usr/local/bin/crashmail -p ${appName} -m ${recipients}
events=PROCESS_STATE