### AWS S3 Configuration

terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

# AWS S3 Bucket Config
resource "aws_s3_bucket" "bucket" {
  bucket = "shelf-sync"
}

# AWS S3 Bucket Public Access Block Config
resource "aws_s3_bucket_public_access_block" "bucket_public_access_block" {
  bucket = aws_s3_bucket.bucket.bucket

  block_public_acls = false
  block_public_policy = false
  ignore_public_acls = false
  restrict_public_buckets = false
}

