import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import TerraformIaCDemo from '../components/demos/TerraformIaCDemo';

const TerraformIaCDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Infrastructure as Code (Terraform)"
      subtitle="AWS/GCP infrastructure provisioning, state management, and modules"
      emoji="🏗️"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Vulnerability Scanner', onClick: () => setCurrentPage('vulnerability-scanner-demo') }}
      demo={<TerraformIaCDemo />}
      overview="Complete Infrastructure as Code solution using Terraform for provisioning and managing cloud infrastructure. Includes VPC setup, compute resources, security groups, and reusable modules for AWS, GCP, and Azure."
      role="DevOps engineering, infrastructure design, Terraform development, cloud architecture, and state management"
      stack={["Terraform", "AWS", "GCP", "Azure", "HCL", "State Management", "Modules"]}
      challenges={[
        "Designing modular and reusable infrastructure",
        "Managing Terraform state across environments",
        "Implementing proper variable and output management",
        "Handling state locking and collaboration",
        "Creating comprehensive documentation"
      ]}
      results={[
        "Provisioned 50+ infrastructure resources",
        "Created reusable modules reducing code by 60%",
        "Implemented state management with S3 backend",
        "Established infrastructure versioning",
        "Built multi-environment support (dev/staging/prod)"
      ]}
      problem="Managing cloud infrastructure manually is error-prone, time-consuming, and difficult to version control. Infrastructure changes need to be tracked, reproducible, and collaborative."
      approach="Built a comprehensive Terraform-based IaC solution with reusable modules, proper state management, variable configuration, and multi-environment support. The infrastructure is version-controlled and follows best practices."
      highlights={[
        "Declarative infrastructure definition",
        "State management with remote backend",
        "Reusable modules for common patterns",
        "Multi-cloud support (AWS, GCP, Azure)",
        "Plan and apply workflows",
        "Infrastructure versioning"
      ]}
      tutorialSummary="Learn Infrastructure as Code with Terraform. Build reusable infrastructure modules, manage state, and provision cloud resources across AWS, GCP, and Azure. Create production-ready infrastructure definitions."
      difficulty="Advanced"
      timeEstimate="120 min"
      keyConcepts={[
        { name: "Infrastructure as Code", description: "Defining infrastructure in code" },
        { name: "State Management", description: "Tracking infrastructure state" },
        { name: "Modules", description: "Reusable infrastructure components" },
        { name: "Provisioning", description: "Creating infrastructure resources" }
      ]}
      tutorialSteps={[
        {
          title: "Install and Setup Terraform",
          description: "Install Terraform and configure providers",
          steps: [
            "Install Terraform CLI",
            "Configure AWS/GCP credentials",
            "Initialize Terraform provider",
            "Verify installation"
          ]
        },
        {
          title: "Create Basic Infrastructure",
          description: "Define VPC and networking resources",
          steps: [
            "Create main.tf file",
            "Define VPC and subnets",
            "Configure security groups",
            "Set up internet gateway"
          ]
        },
        {
          title: "Add Compute Resources",
          description: "Provision EC2 instances and resources",
          steps: [
            "Create EC2 instance resource",
            "Configure instance type and AMI",
            "Set up user data scripts",
            "Add tags and metadata"
          ]
        },
        {
          title: "Create Modules",
          description: "Build reusable infrastructure modules",
          steps: [
            "Create module structure",
            "Define module inputs and outputs",
            "Refactor existing resources into modules",
            "Test module usage"
          ]
        },
        {
          title: "Configure State Management",
          description: "Set up remote state backend",
          steps: [
            "Configure S3 backend for state",
            "Set up state locking with DynamoDB",
            "Initialize remote state",
            "Migrate existing state"
          ]
        }
      ]}
      setupInstructions={`1. Install Terraform:
# On macOS
brew install terraform

# On Linux
wget https://releases.hashicorp.com/terraform/1.5.0/terraform_1.5.0_linux_amd64.zip
unzip terraform_1.5.0_linux_amd64.zip
sudo mv terraform /usr/local/bin/

2. Configure AWS credentials:
aws configure

3. Initialize Terraform:
terraform init

4. Plan infrastructure:
terraform plan`}
      deploymentGuide={`1. Review plan:
terraform plan

2. Apply infrastructure:
terraform apply

3. Verify resources:
terraform state list
terraform show

4. Destroy infrastructure:
terraform destroy`}
      troubleshooting={[
        {
          issue: "State file conflicts",
          solution: "Use remote state backend with state locking to prevent conflicts"
        },
        {
          issue: "Provider authentication errors",
          solution: "Verify AWS credentials and IAM permissions are correctly configured"
        },
        {
          issue: "Module not found",
          solution: "Run terraform init to download modules and verify module paths"
        }
      ]}
    />
  );
};

export default TerraformIaCDemoPage;

