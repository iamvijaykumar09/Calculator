pipeline{

  agent any

  stages{
    stage('Clone Repository'){
      steps{
        git url: 'https://github.com/iamvijaykumar09/Calculator.git',
          branch:'main'
      }
    }
    stage('Install Dependencies'){
      steps{
        sh 'cd frontend && npm install'
        sh 'cd backend && npm install'
      }
    }
    stage('Build React App'){
      steps{
        sh 'cd frontend && npm run build'
      }
    }
    stage('Dockerize App'){
      steps{
        sh 'docker build -t iamvijay25/react-calculator:latest ./frontend'
        sh 'docker build -t iamvijay25/node-calculator:latest ./backend'
        sh 'docker push iamvijay25/react-calculator:latest'
        sh 'docker push iamvijay25/node-calculator:latest'
      }
    }
    stage('Deploy to Minikube'){
      steps{
        sh 'ansible-playbook -i inventory.ini deploy.yml'
      }
    }
  }
}
