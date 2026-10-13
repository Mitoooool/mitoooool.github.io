# LISEB 静态网页

两页、无需构建、无需第三方脚本或字体；可直接部署至GitHub Pages。主内容为中文，配英文名称与论文题名；不是完整双语切换网站。

- `index.html`：简短实验室介绍、四个研究方向、缨翅目项目入口、专刊客编／征稿、联系。
- `achievements.html`：3篇已发表论文、1项接收稿、2篇公开预印本、开放资源和在研方向；论文按条目所标日期倒序。
- `styles.css`：响应式样式。
- `favicon.svg`：可替换的临时字母标记，不是正式实验室徽标。
- `.nojekyll`：允许GitHub Pages直接提供静态文件。

## 本地预览

直接用浏览器打开index.html即可。所有本地导航和样式均为相对路径，根域名和仓库子路径部署都可用。

## 部署到GitHub Pages

1. 建立或选择用于实验室主页的GitHub仓库。若使用用户主页，仓库名称应为`mitoooool.github.io`；若使用项目仓库，例如`liseb-lab`，访问地址通常为`https://mitoooool.github.io/liseb-lab/`。实际账号／仓库由负责人决定。
2. 将本目录的网页文件放入仓库根目录；上传时保留`.nojekyll`。不要将整个上级输出目录作为仓库上传。
3. 在仓库Settings → Pages中选择Deploy from a branch，选择实际分支（通常main）及`/(root)`，保存，等待GitHub部署完成。
4. 检查正式地址的双页面导航、手机显示、DOI与资源链接。现有缨翅目项目独立保留，无需覆盖。

实验室主页使用`Mitoooool/mitoooool.github.io`仓库，正式地址为`https://mitoooool.github.io/`；成果页为`https://mitoooool.github.io/achievements.html`。GitHub Pages由`main`分支根目录提供。公开仓库仅放置本目录的6个站点文件，不含内部研究材料或账号凭据。

## 发布前确认

- 实验室名称、LISEB／Niu G Lab识别、学院和公开邮箱由负责人确认；页面根据现有稿件及参考项目整理，不声称已获官方审批。
- 成果页是精选展示，非历年论文穷尽目录。没有列未核实的作者名单、成员安排、基金统计、ORCID或新分类方案。
- MitoOmicsDB按校样标为“接收·校样”，尚未核实正式上线。数据库网址本轮返回502，因此不设置该入口；NCBI2GO仓库可访问。
- 松叶蜂科论文按2023年bioRxiv预印本展示，显著注明未同行评审；若已有期刊版，应在核实后更新。
- 海绵预印本已由Crossref与bioRxiv API核实，v1公开于2026-08-30；DOI中的08.28不是公开日期。纳入2026年条目，放在2026-09-15接收校样之后。
- 新增两栖动物基因组组织论文（Xiao et al., BMC Genomics, 2025-03-17）与qGO方法论文（Shi et al., BMC Genomics, 2024-11-18）；发表信息经Crossref核实，贡献摘要依据所提供的论文全文整理。
- qGO资源链接指向原仓库`https://github.com/Limonada-Y/qGO`。尚未向mitoooool迁移；原仓库未见明确代码许可证，不以论文许可替代代码许可，不将原仓库标作本账号下的项目。
- 专刊条目依照提供的中英文征稿简介提炼，牛耕耘为客座编辑之一；截止2027-03-31，注明以期刊公告为准。仅保留简短范围和入口，不搬入整篇文案。
- 已核实期刊当前官网为`https://www.maxapress.com/jzser`，官网提供投稿系统`https://mc03.manuscriptcentral.com/mapjzser`。未找到该专刊独立官方页面，现有按钮明确为期刊投稿／官网；有专刊直达页后可替换。正式投稿需按系统实际专刊选项操作，若暂无选项应先咨询客编。
- 内容核对截至2026-10-12。论文正式发表后应更新状态、日期和引用，而不只改标签。
- `private/`、`audit/`、原始稿件、清单JSON和源路径绝不能混入公开站点。

## 修改方式

文字直接编辑两份HTML；论文条目沿用`publication`结构。颜色和版式集中在styles.css，手机断点520/800/1050px。HTML中已有跳转主内容、当前页标记、键盘焦点、新标签提示和减少动态效果支持。

参考设计来自现有Thysanoptera Phylomitogenomics项目的简洁导航和专题组织思路；未复制其数据、图片或代码，也未把该项目的占位按钮带入本网站。
