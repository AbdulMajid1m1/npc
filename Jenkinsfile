pipeline {
    agent any

    environment {
        NODE_ENV = "development"
        JWT_EXPIRATION = "90d"
        COOKIE_AGE = "90"
        DATABASE_URL = "${npc_DATABASE_URL}"
        GS1DBV2_DATABASE_URL = "${npc_GS1DBV2_DATABASE_URL}"
        GMAIL_USERNAME = "${npc_EMAIL_USERNAME}"
        GMAIL_PASSWORD = "${npc_EMAIL_PASSWORD}"
        JWT_SECRET = "${npc_USER_JWT_SECRET}"
        MEMBER_JWT_SECRET = "${npc_MEMBER_JWT_SECRET}"
        ADMIN_JWT_SECRET = "${npc_ADMIN_JWT_SECRET}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/dev']], extensions: [], userRemoteConfigs: [[credentialsId: 'usernameCredentials', url: 'https://github.com/AbdulMajid1m1/npc.git']])
            }
        }
        stage('Install Dependencies - Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                }
            }
        }
        stage('Build - Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm run build'
                }
            }
        }
        stage('Install Dependencies - Backend') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }
        stage('Update Schema - Backend') {
            steps {
                dir('backend') {
                    script {
                        def processStatus = bat(script: 'pm2 list', returnStdout: true).trim()
                        if (processStatus.contains('npc_backend')) {
                            bat 'pm2 stop npc_backend || exit 0'
                            bat 'pm2 delete npc_backend || exit 0'
                        }
                    }
                    bat 'npm run update:schema'
                }
            }
        }
        stage('Start Backend') {
            steps {
                dir('backend') {
                    bat 'pm2 start server.js --name npc_backend'
                }
            }
        }
    }
}
