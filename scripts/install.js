#!/usr/bin/env node
/**
 * DexScan Skill 安装脚本
 * 将技能安装到 Claude Code 的 skills 目录
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

const SKILL_NAME = 'dexscan-skill';

// 确定 Claude Code skills 目录
function getSkillsDir() {
    const homeDir = os.homedir();
    // Windows: C:\Users\<user>\.claude\skills
    // macOS/Linux: ~/.claude/skills
    return path.join(homeDir, '.claude', 'skills');
}

function getSkillSourceDir() {
    return path.resolve(__dirname, '..');
}

function install() {
    const skillsDir = getSkillsDir();
    const targetDir = path.join(skillsDir, SKILL_NAME);

    // 检查 skills 目录是否存在
    if (!fs.existsSync(skillsDir)) {
        console.log(`创建 skills 目录: ${skillsDir}`);
        fs.mkdirSync(skillsDir, { recursive: true });
    }

    // 检查源目录
    const sourceDir = getSkillSourceDir();
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

    // 如果目标已存在，先删除
    if (fs.existsSync(targetDir)) {
        console.log(`移除已存在的技能: ${targetDir}`);
        fs.rmSync(targetDir, { recursive: true });
    }

    // 复制技能目录
    console.log(`安装技能到: ${targetDir}`);
    copyDir(sourceDir, targetDir);

    console.log('\n✅ 安装成功!');
    console.log(`   技能名称: ${SKILL_NAME}`);
    console.log(`   安装路径: ${targetDir}`);
    console.log('\n请重启 Claude Code 以加载新技能。');
}

function copyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true });

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        // 跳过 .git 目录
        if (entry.name === '.git') continue;

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

install();
