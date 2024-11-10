terraform {
  required_providers {
    mongodbatlas = {
      source = "mongodb/mongodbatlas"
    }
    aws = {
      source = "hashicorp/aws"
    }
  }
}

variable "mongodb_public_key" {}
variable "mongodb_private_key" {}
variable "aws_access_key" {}
variable "aws_secret_key" {}

provider "mongodbatlas" {
    public_key  = var.mongodb_public_key
    private_key = var.mongodb_private_key
}
provider "aws" {
  region = "us-east-2"
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

module "mongodb" {
    source = "./modules/mongodb/"
}
module "aws_ec2" {
    source = "./modules/aws_ec2/"
}
module "aws_s3" {
    source = "./modules/aws_s3/"
}