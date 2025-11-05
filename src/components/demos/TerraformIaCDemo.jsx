import React, { useState } from 'react';
import CodeViewer from '../CodeViewer';

const TerraformIaCDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);

  const codeData = {
    code: `# Terraform configuration for AWS infrastructure
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  
  backend "s3" {
    bucket = "my-terraform-state"
    key    = "infrastructure/terraform.tfstate"
    region = "us-east-1"
  }
}

# Provider configuration
provider "aws" {
  region = var.aws_region
}

# Variables
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

# VPC Module
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  
  name = "\${var.environment}-vpc"
  cidr = "10.0.0.0/16"
  
  azs             = ["us-east-1a", "us-east-1b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]
  
  enable_nat_gateway = true
  enable_vpn_gateway = false
  
  tags = {
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

# EC2 Instance
resource "aws_instance" "web_server" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.medium"
  subnet_id     = module.vpc.public_subnets[0]
  
  vpc_security_group_ids = [aws_security_group.web.id]
  
  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install -y nginx
              systemctl start nginx
              systemctl enable nginx
              EOF
  
  tags = {
    Name = "\${var.environment}-web-server"
  }
}

# Security Group
resource "aws_security_group" "web" {
  name        = "\${var.environment}-web-sg"
  description = "Security group for web servers"
  vpc_id      = module.vpc.vpc_id
  
  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  tags = {
    Name = "\${var.environment}-web-sg"
  }
}

# Outputs
output "vpc_id" {
  value = module.vpc.vpc_id
}

output "web_server_ip" {
  value = aws_instance.web_server.public_ip
}`,
    explanation: `Infrastructure as Code (IaC) with Terraform enables declarative provisioning and management of cloud infrastructure.

## Key Features

**Declarative Configuration**: Define infrastructure as code for version control and reproducibility.

**State Management**: Track infrastructure state for change management and updates.

**Modules**: Reusable infrastructure components for consistency and maintainability.

**Multi-Cloud Support**: Provision resources across AWS, GCP, Azure, and more.

## Technical Implementation

Terraform uses HCL (HashiCorp Configuration Language) to define infrastructure, manages state files for tracking, and supports modules for reusable components.

## Benefits

- **Version Control**: Infrastructure changes tracked in Git
- **Reproducibility**: Same infrastructure across environments
- **Collaboration**: Team members can review and contribute
- **Automation**: Automated infrastructure provisioning and updates`,
    technologies: [
      { name: 'Terraform', description: 'Infrastructure as Code tool', tags: ['IaC', 'DevOps'] },
      { name: 'AWS', description: 'Cloud provider', tags: ['Cloud', 'AWS'] },
      { name: 'HCL', description: 'Terraform configuration language', tags: ['Configuration'] },
      { name: 'State Management', description: 'Infrastructure state tracking', tags: ['State'] }
    ],
    concepts: [
      { name: 'Infrastructure as Code', description: 'Defining infrastructure in code', example: 'Version-controlled infrastructure definitions' },
      { name: 'State Management', description: 'Tracking infrastructure state', example: 'Terraform state files' },
      { name: 'Modules', description: 'Reusable infrastructure components', example: 'VPC module for networking' },
      { name: 'Provisioning', description: 'Creating infrastructure resources', example: 'Terraform apply command' }
    ],
    features: [
      'Declarative infrastructure definition',
      'State management and tracking',
      'Reusable modules',
      'Multi-cloud support',
      'Plan and apply workflows',
      'Infrastructure versioning'
    ]
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Infrastructure as Code (Terraform)</h3>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
          >
            View Code
          </button>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <div className="text-2xl mb-2">☁️</div>
              <div className="text-sm font-medium text-white">VPC</div>
              <div className="text-xs text-gray-400 mt-1">Networking</div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <div className="text-2xl mb-2">🖥️</div>
              <div className="text-sm font-medium text-white">EC2</div>
              <div className="text-xs text-gray-400 mt-1">Compute</div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <div className="text-2xl mb-2">🔒</div>
              <div className="text-sm font-medium text-white">Security</div>
              <div className="text-xs text-gray-400 mt-1">Groups</div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <div className="text-2xl mb-2">📦</div>
              <div className="text-sm font-medium text-white">Modules</div>
              <div className="text-xs text-gray-400 mt-1">Reusable</div>
            </div>
          </div>
        </div>
      </div>
      <CodeViewer
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
        code={codeData.code}
        language="hcl"
        title="Terraform Infrastructure as Code"
        explanation={codeData.explanation}
        technologies={codeData.technologies}
        concepts={codeData.concepts}
        features={codeData.features}
      />
    </div>
  );
};

export default TerraformIaCDemo;

