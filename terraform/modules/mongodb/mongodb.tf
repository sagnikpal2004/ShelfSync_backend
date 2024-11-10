# ### MongoDB Atlas Configuration

terraform {
  required_providers {
    mongodbatlas = {
        source = "mongodb/mongodbatlas"
    }
  }
}

# Create a project in MongoDB Atlas
resource "mongodbatlas_project" "project" {
  name   = "ShelfSync"
  org_id = "66eb81df970c280437e58429"
}

# Create a MongoDB Cluster for the free option
resource "mongodbatlas_cluster" "cluster" {
  project_id            = mongodbatlas_project.project.id
  name                  = "cluster0"
  cluster_type          = "REPLICASET"
  disk_size_gb          = 0.5
  replication_factor    = 3
  backup_enabled        = false
  provider_name         = "TENANT"
  backing_provider_name = "AWS"
  provider_region_name  = "US_EAST_1"
  provider_instance_size_name = "M0"
}

# Create a Database User for your cluster
resource "mongodbatlas_database_user" "user" {
  project_id    = mongodbatlas_project.project.id
  username      = "ShelfSync"
  password      = "whyisitasitis"
  auth_database_name = "admin"

  roles {
    database_name = "ShelfSync"
    role_name     = "readWrite"
  }
}

# Set up IP whitelist
resource "mongodbatlas_project_ip_access_list" "ip_whitelist" {
  project_id = mongodbatlas_project.project.id
  cidr_block = "0.0.0.0/0"
}