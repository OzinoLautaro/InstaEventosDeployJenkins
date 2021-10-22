pipeline {
  agent {
    docker { image 'node:latest' }
  }
  stages {
    stage('Install and build') {
      steps {
        sh 'npm install'
        sh 'ng build'
      }
    }

    stage('Test') {
      parallel {
        stage('End 2 end test') {
            steps { sh 'ng e2e' }
        }
        stage('Unit tests') {
            steps { sh 'ng test' }
        }
      }
    }

    stage('Open') {
      steps { sh 'ng serve --open' }
    }
  }
}
//https://www.youtube.com/watch?v=cbUqgS82d48
