# 🔧 Security Group Configuration Guide

## Your Security Groups:
1. **sg-03141136bf89fbc1c** - `launch-wizard-1` (created 2025-09-24T02:52:01.697Z)
2. **sg-02ea16e3728f1fbeb** - `default` 
3. **sg-00635a69def9f4636** - `launch-wizard-2` (created 2025-09-24T03:09:07.882Z)

## 🎯 Most Likely Security Group
Based on the creation time, **`launch-wizard-1` (sg-03141136bf89fbc1c)** is most likely attached to your EC2 instance.

## 📋 Steps to Configure Security Groups

### Step 1: Go to AWS Console
1. Open **AWS Console** → **EC2 Dashboard**
2. Click **"Security Groups"** in the left sidebar
3. Find and click on **`launch-wizard-1`** (sg-03141136bf89fbc1c)

### Step 2: Edit Inbound Rules
1. Click **"Edit inbound rules"** button
2. Click **"Add rule"** for each port you need:

| Port | Type | Source | Description |
|------|------|--------|-------------|
| 3000 | Custom TCP | 0.0.0.0/0 | Frontend |
| 8080 | Custom TCP | 0.0.0.0/0 | User Service |
| 8081 | Custom TCP | 0.0.0.0/0 | Article Service |
| 5001 | Custom TCP | 0.0.0.0/0 | Analysis Service |

### Step 3: Save Changes
1. Click **"Save rules"**
2. Wait 1-2 minutes for changes to take effect

## 🧪 Test After Configuration
After saving the security group rules, run:
```bash
./test-deployment.sh
```

## 🌐 Access Your App
Once configured, your app will be available at:
- **Frontend**: http://3.144.189.176:3000
- **User Service**: http://3.144.189.176:8080
- **Article Service**: http://3.144.189.176:8081
- **Analysis Service**: http://3.144.189.176:5001

## 🔍 If launch-wizard-1 is not the right one:
Try configuring **`launch-wizard-2`** (sg-00635a69def9f4636) instead, as it was created later and might be the active one.

## ⚡ Quick Test Command
After configuring security groups, test with:
```bash
curl -I http://3.144.189.176:3000
```
You should get a `200 OK` response if configured correctly.
