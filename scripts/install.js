#!/usr/bin/env node
/**
 * DexScan Skill 安装脚本
 * 检测运行环境，安装到 Claude Code 或 OpenClaw 的 skills 目录
 * 支持 Windows/macOS/Linux
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const SKILL_NAME = 'dexscan-skill';

// 检测运行平台
function detectPlatform() {
    // 检查环境变量
    if (process.env.OPENCLAW_MODE || process.env.OPENCLAW_INSTALL) {
        return 'openclaw';
    }

    // 检查是否通过 claude CLI 调用
    try {
        execSync('claude --version', { stdio: 'ignore' });
        return 'claude';
    } catch (e) {
        // claude CLI 不存在
    }

    // 检查是否通过 openclaw CLI 调用
    try {
        execSync('openclaw --version', { stdio: 'ignore' });
        return 'openclaw';
    } catch (e) {
        // openclaw CLI 不存在
    }

    // 默认 Claude Code
    return 'claude';
}

function getSkillsDir(platform) {
    const homeDir = os.homedir();
    if (platform === 'openclaw') {
        return path.join(homeDir, '.openclaw', 'skills');
    }
    return path.join(homeDir, '.claude', 'skills');
}

function getSkillSourceDir() {
    return path.resolve(__dirname, '..');
}

function copyDir(src, dest, excludeDirs = ['.git']) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (excludeDirs.includes(entry.name)) {
            continue;
        }

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath, excludeDirs);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

function install() {
    const platform = detectPlatform();
    const skillsDir = getSkillsDir(platform);
    const targetDir = path.join(skillsDir, SKILL_NAME);
    const sourceDir = getSkillSourceDir();

    // 检查源目录
    if (!fs.existsSync(sourceDir)) {
        console.error(`错误: 技能源目录不存在: ${sourceDir}`);
        process.exit(1);
    }

    // 检查 SKILL.md 是否存在
    const skillMd = path.join(sourceDir, 'SKILL.md');
    if (!fs.existsSync(skillMd)) {
        console.error(`错误: SKILL.md 不存在: ${skillMd}`);
        process.exit(1);
    }

    // 创建 skills 目录
    if (!fs.existsSync(skillsDir)) {
        console.log(`创建 skills 目录: ${skillsDir}`);
        fs.mkdirSync(skillsDir, { recursive: true });
    }

    // 如果目标已存在，先删除
    if (fs.existsSync(targetDir)) {
        console.log(`移除已存在的技能: ${targetDir}`);
        fs.rmSync(targetDir, { recursive: true });
    }

    // 复制技能目录
    console.log(`检测平台: ${platform}`);
    console.log(`安装技能到: ${targetDir}`);
    copyDir(sourceDir, targetDir);

    console.log('');
    console.log('✅ 安装成功!');
    console.log(`   技能名称: ${SKILL_NAME}`);
    console.log(`   安装路径: ${targetDir}`);
    console.log('');
    console.log(`请重启 ${platform === 'openclaw' ? 'OpenClaw' : 'Claude Code'} 以加载新技能。`);
}

install();
