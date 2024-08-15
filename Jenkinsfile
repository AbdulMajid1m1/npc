pipeline {
    agent any

    environment {
        NODE_ENV = "development"
        JWT_EXPIRATION = "90d"
        COOKIE_AGE = "90"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/dev']], extensions: [], userRemoteConfigs: [[credentialsId: 'usernameCredentials', url: 'https://github.com/AbdulMajid1m1/npc.git']])
            }
        }
        stage('Load Credentials') {
            steps {
                withCredentials([
                    string(credentialsId: 'npc_DATABASE_URL', variable: 'DATABASE_URL'),
                    string(credentialsId: 'npc_GS1DBV2_DATABASE_URL', variable: 'GS1DBV2_DATABASE_URL'),
                    string(credentialsId: 'npc_EMAIL_USERNAME', variable: 'GMAIL_USERNAME'),
                    string(credentialsId: 'npc_EMAIL_PASSWORD', variable: 'GMAIL_PASSWORD'),
                    string(credentialsId: 'npc_USER_JWT_SECRET', variable: 'JWT_SECRET'),
                    string(credentialsId: 'npc_MEMBER_JWT_SECRET', variable: 'MEMBER_JWT_SECRET'),
                    string(credentialsId: 'npc_ADMIN_JWT_SECRET', variable: 'ADMIN_JWT_SECRET')
                ]) {
                    script {
                        env.DATABASE_URL = "${env.DATABASE_URL}"
                        env.GS1DBV2_DATABASE_URL = "${env.GS1DBV2_DATABASE_URL}"
                        env.GMAIL_USERNAME = "${env.GMAIL_USERNAME}"
                        env.GMAIL_PASSWORD = "${env.GMAIL_PASSWORD}"
                        env.JWT_SECRET = "${env.JWT_SECRET}"
                        env.MEMBER_JWT_SECRET = "${env.MEMBER_JWT_SECRET}"
                        env.ADMIN_JWT_SECRET = "${env.ADMIN_JWT_SECRET}"
                    }
                }
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
                    withCredentials([
                        string(credentialsId: 'npc_DATABASE_URL', variable: 'DATABASE_URL'),
                        string(credentialsId: 'npc_GS1DBV2_DATABASE_URL', variable: 'GS1DBV2_DATABASE_URL'),
                        string(credentialsId: 'npc_EMAIL_USERNAME', variable: 'GMAIL_USERNAME'),
                        string(credentialsId: 'npc_EMAIL_PASSWORD', variable: 'GMAIL_PASSWORD'),
                        string(credentialsId: 'npc_USER_JWT_SECRET', variable: 'JWT_SECRET'),
                        string(credentialsId: 'npc_MEMBER_JWT_SECRET', variable: 'MEMBER_JWT_SECRET'),
                        string(credentialsId: 'npc_ADMIN_JWT_SECRET', variable: 'ADMIN_JWT_SECRET')
                    ]) {
                        sh 'export DATABASE_URL=$DATABASE_URL && export GS1DBV2_DATABASE_URL=$GS1DBV2_DATABASE_URL && export GMAIL_USERNAME=$GMAIL_USERNAME && export GMAIL_PASSWORD=$GMAIL_PASSWORD && export JWT_SECRET=$JWT_SECRET && export MEMBER_JWT_SECRET=$MEMBER_JWT_SECRET && export ADMIN_JWT_SECRET=$ADMIN_JWT_SECRET && pm2 start ./server.js --name npc_backend'
                    }
                }
            }
        }
    }
}
