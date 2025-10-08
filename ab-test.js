#!/usr/bin/env node

/**
 * A/B Testing Script for Market Pulse
 * 
 * This script helps manage A/B testing between the original and AI versions
 * of the Market Pulse application.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  originalVersion: {
    name: 'Original',
    port: 3001,
    buildDir: 'dist',
    indexFile: 'index.html',
    description: 'Traditional trading platform with basic features'
  },
  aiVersion: {
    name: 'AI Enhanced',
    port: 3002,
    buildDir: 'dist-ai',
    indexFile: 'index-ai.html',
    description: 'AI-powered trading platform with intelligent features'
  }
};

// A/B Test Manager
class ABTestManager {
  constructor() {
    this.currentVersion = this.getCurrentVersion();
  }

  getCurrentVersion() {
    const versionFile = path.join(__dirname, '.ab-test-version');
    if (fs.existsSync(versionFile)) {
      return fs.readFileSync(versionFile, 'utf8').trim();
    }
    return 'original'; // Default to original
  }

  setVersion(version) {
    const versionFile = path.join(__dirname, '.ab-test-version');
    fs.writeFileSync(versionFile, version);
    this.currentVersion = version;
    console.log(`✅ Switched to ${CONFIG[version].name} version`);
  }

  getVersionInfo(version) {
    return CONFIG[version] || CONFIG.originalVersion;
  }

  listVersions() {
    console.log('\n📊 Available Versions:\n');
    Object.entries(CONFIG).forEach(([key, config]) => {
      const isActive = key === this.currentVersion;
      console.log(`${isActive ? '🟢' : '⚪'} ${config.name}`);
      console.log(`   Port: ${config.port}`);
      console.log(`   Description: ${config.description}`);
      console.log(`   Build Directory: ${config.buildDir}`);
      console.log(`   Index File: ${config.indexFile}\n`);
    });
  }

  checkBuildStatus() {
    console.log('\n🔍 Checking Build Status:\n');
    
    Object.entries(CONFIG).forEach(([key, config]) => {
      const buildPath = path.join(__dirname, config.buildDir);
      const exists = fs.existsSync(buildPath);
      
      console.log(`${exists ? '✅' : '❌'} ${config.name}`);
      console.log(`   Build Directory: ${buildPath}`);
      console.log(`   Status: ${exists ? 'Built' : 'Not built'}`);
      
      if (exists) {
        const files = fs.readdirSync(buildPath);
        console.log(`   Files: ${files.length} files`);
      }
      console.log('');
    });
  }

  generateReport() {
    console.log('\n📈 A/B Test Report:\n');
    
    const versionInfo = this.getVersionInfo(this.currentVersion);
    console.log(`Current Active Version: ${versionInfo.name}`);
    console.log(`Port: ${versionInfo.port}`);
    console.log(`Description: ${versionInfo.description}`);
    
    // Check if both versions are built
    const originalBuilt = fs.existsSync(path.join(__dirname, CONFIG.originalVersion.buildDir));
    const aiBuilt = fs.existsSync(path.join(__dirname, CONFIG.aiVersion.buildDir));
    
    console.log(`\nBuild Status:`);
    console.log(`  Original: ${originalBuilt ? '✅ Built' : '❌ Not built'}`);
    console.log(`  AI Version: ${aiBuilt ? '✅ Built' : '❌ Not built'}`);
    
    if (originalBuilt && aiBuilt) {
      console.log(`\n🎉 Both versions are ready for A/B testing!`);
      console.log(`\nTo test:`);
      console.log(`  Original: http://localhost:${CONFIG.originalVersion.port}`);
      console.log(`  AI Version: http://localhost:${CONFIG.aiVersion.port}`);
    } else {
      console.log(`\n⚠️  Please build both versions first:`);
      console.log(`  npm run build && npm run build:ai`);
    }
  }

  help() {
    console.log(`
🚀 Market Pulse A/B Testing Manager

Usage: node ab-test.js [command]

Commands:
  list                    List all available versions
  status                  Check build status of all versions
  switch <version>        Switch to specified version (original|ai)
  report                  Generate A/B test report
  help                    Show this help message

Examples:
  node ab-test.js list
  node ab-test.js switch ai
  node ab-test.js status
  node ab-test.js report

Current Version: ${this.getVersionInfo(this.currentVersion).name}
    `);
  }
}

// Main execution
const manager = new ABTestManager();
const command = process.argv[2];
const arg = process.argv[3];

switch (command) {
  case 'list':
    manager.listVersions();
    break;
  case 'status':
    manager.checkBuildStatus();
    break;
  case 'switch':
    if (arg && CONFIG[arg]) {
      manager.setVersion(arg);
    } else {
      console.log('❌ Invalid version. Use "original" or "ai"');
      console.log('Available versions:', Object.keys(CONFIG).join(', '));
    }
    break;
  case 'report':
    manager.generateReport();
    break;
  case 'help':
  default:
    manager.help();
    break;
}

