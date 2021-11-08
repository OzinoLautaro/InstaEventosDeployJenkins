node{
  stage('Checkout SCM'){
    git branch: 'main', url: 'https://github.com/OzinoLautaro/InstaEventosDeployJenkins.git'
  }
  
  stage('Install node modules'){
    sh "npm install"
  }
  
  stage("Test"){
    sh "npm run test"
  }
  
  stage("Build"){
    sh "npm run build --prod"
  }
  
  stage("Copy"){
    sh "cp -a /var/lib/jenkins/workspace-Deploy-Eventos/dist/main/. /var/www/main/html/*"
  }
}
