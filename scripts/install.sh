#!/usr/bin/env bash
#
# DexScan Skill 安装脚本
# 将技能安装到 Claude Code 的 skills 目录
#

SKILL_NAME="dexscan-skill"

# 确定 Claude Code skills 目录
get_skills_dir() {
    local home_dir
    home_dir="$HOME"
    # Windows: C:\Users\<user>\.claude\skills
    # macOS/Linux: ~/.claude/skills
    echo "$home_dir/.claude/skills"
}

get_skill_source_dir() {
    cd "$(dirname "$0")/.." && pwd
}

install() {
    local skills_dir
    local target_dir
    local source_dir

    skills_dir=$(get_skills_dir)
    target_dir="$skills_dir/$SKILL_NAME"
    source_dir=$(get_skill_source_dir)

    # 检查源目录
    if [[ ! -d "$source_dir" ]]; then
        echo "错误: 技能源目录不存在: $source_dir"
        exit 1
    fi

    # 检查 SKILL.md 是否存在
    if [[ ! -f "$source_dir/SKILL.md" ]]; then
        echo "错误: SKILL.md 不存在: $source_dir/SKILL.md"
        exit 1
    fi

    # 创建 skills 目录
    if [[ ! -d "$skills_dir" ]]; then
        echo "创建 skills 目录: $skills_dir"
        mkdir -p "$skills_dir"
    fi

    # 如果目标已存在，先删除
    if [[ -d "$target_dir" ]]; then
        echo "移除已存在的技能: $target_dir"
        rm -rf "$target_dir"
    fi

    # 复制技能目录（排除 .git）
    echo "安装技能到: $target_dir"
    mkdir -p "$target_dir"
    shopt -s dotglob
    for item in "$source_dir"/*; do
        [[ "$item" == "$source_dir/.git" ]] && continue
        cp -r "$item" "$target_dir/"
    done
    shopt -u dotglob

    echo ""
    echo "✅ 安装成功!"
    echo "   技能名称: $SKILL_NAME"
    echo "   安装路径: $target_dir"
    echo ""
    echo "请重启 Claude Code 以加载新技能。"
}

install
