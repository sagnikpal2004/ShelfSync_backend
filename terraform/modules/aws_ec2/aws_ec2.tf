### AWS EC2 Configuration

terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

# AWS Security Open Ports
resource "aws_security_group" "security" {
    name        = "ec2_security_group"
    description = "Allow SSH and HTTP traffic"

    ingress {
        description = "SSH from VPC"
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        description = "ShelfSync from VPC"
        from_port   = 80
        to_port     = 3000
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

# AWS SSH Key Pair
resource "aws_key_pair" "ec2_key_pair" {
    key_name   = "shelf-sync"
    public_key = file("~/.ssh/id_rsa.pub")
}

# AWS EC2 Instance
resource "aws_instance" "ec2" {
    ami           = "ami-0ea3c35c5c3284d82"
    instance_type = "t2.micro"
    key_name      = "shelf-sync"

    user_data = <<-EOF
                #!/bin/bash
                sudo yum update -y
                sudo yum install git -y
                sudo yum install nodejs -y
                sudo yum install npm -y

                git clone https://github.com/sagnikpal2004/ShelfSync_backend.git
                cd ShelfSync_backend
                npm install
                npm run build
                # npm run start
                EOF
}

