# Please change the default names as per your requirements.

variable "aws_profile" {
  description = "AWS profile name"
  type        = string
}

variable "aws_region" {
  description = "AWS region"
  type        = string
}

variable "bucket_name" {
  default = "my-bucket"
	type = string
}

variable "created_by" {
  default = "Imran Sayed"
	type = string
}

variable "object_ownership" {
  default = "BucketOwnerPreferred"
	type = string
}