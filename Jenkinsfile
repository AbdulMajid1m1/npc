pipeline {
    agent any

    environment {
        NODE_ENV = "development"
        JWT_EXPIRATION = "90d"
        COOKIE_AGE = "90"
        DATABASE_URL = credentials('npc_DATABASE_URL')
        GS1DBV2_DATABASE_URL = credentials('npc_GS1DBV2_DATABASE_URL')
        GMAIL_USERNAME = credentials('npc_EMAIL_USERNAME')
        GMAIL_PASSWORD = credentials('npc_EMAIL_PASSWORD')
        JWT_SECRET = credentials('npc_USER_JWT_SECRET')
        MEMBER_JWT_SECRET = credentials('npc_MEMBER_JWT_SECRET')
        ADMIN_JWT_SECRET = credentials('npc_ADMIN_JWT_SECRET')
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
                    sh 'npm install'
                }
            }
        }
        stage('Build - Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }
        stage('Install Dependencies - Backend') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }
        stage('Update Schema - Backend') {
            steps {
                dir('backend') {
                    script {
                        def processStatus = sh(script: 'pm2 list', returnStdout: true).trim()
                        if (processStatus.contains('npc_backend')) {
                            sh 'pm2 stop npc_backend || exit 0'
                            sh 'pm2 delete npc_backend || exit 0'
                        }
                    }
                    sh 'npm run update:schema'
                }
            }
        }
        stage('Start Backend') {
            steps {
                dir('backend') {
                    sh 'pm2 start ./server.js --name npc_backend'
                }
            }
        }
    }
}
