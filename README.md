# This repo contains the Terraform code which can deploy the React app to the Cloudfront Distribution and S3

# Pre-Requisites
- Node.js
- AWS CLI
- Terraform

# Steps
- Download and clone the repo
- cd into ```react-iac-terraform``` and run ```npm install``` / ```yarn install``` to download the dependencies.
- Make a build of the React app by using command ```npm run build``` / ```yarn run build```.
- Push the build directory to the S3 bucket using the AWS CLI command ```aws s3 sync ./build s3://my-bucket```.
- cd into ```terraform``` and run ```terraform init``` to install the terraform required packages and dependencies.
- Make the changes to the ```variables.tf``` file according to your requirements.
- Finally push the changes by using the command ```terraform apply```.
