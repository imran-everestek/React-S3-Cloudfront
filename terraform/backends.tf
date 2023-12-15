terraform {
  backend "s3" {
    bucket         = "your-terraform-state-bucket"
    key            = "example/terraform.tfstate"
    region         = "us-east-1"  # specify your AWS region
    encrypt        = true
  }
}
