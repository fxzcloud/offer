import{_ as e,V as p,W as o,X as n,Y as s,Z as t,$ as c,F as i}from"./framework-8edddef6.js";const u="/offer/gg/points.png",l="/offer/gg/lines.png",r={},k=n("h1",{id:"gg",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#gg","aria-hidden":"true"},"#"),s(" gg")],-1),d={href:"https://github.com/fogleman/gg",target:"_blank",rel:"noopener noreferrer"},m={href:"https://pkg.go.dev/github.com/fogleman/gg",target:"_blank",rel:"noopener noreferrer"},g={href:"https://github.com/fogleman/gg/tree/master/examples",target:"_blank",rel:"noopener noreferrer"},b=c(`<p>gg是一个比较老牌的二维的图形渲染引擎，适合用于生成图片。</p><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>go get -u github.com/fogleman/gg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="快速开始" tabindex="-1"><a class="header-anchor" href="#快速开始" aria-hidden="true">#</a> 快速开始</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;github.com/fogleman/gg&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    dc <span class="token operator">:=</span> gg<span class="token punctuation">.</span><span class="token function">NewContext</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span> <span class="token comment">//创建画布 高1000 宽1000</span>
    dc<span class="token punctuation">.</span><span class="token function">DrawCircle</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">,</span> <span class="token number">400</span><span class="token punctuation">)</span> <span class="token comment">// 在 (500,500)坐标位置绘制一个半径400的圆</span>
    dc<span class="token punctuation">.</span><span class="token function">SetRGB</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment">// 设置颜色黑色</span>
    dc<span class="token punctuation">.</span><span class="token function">Fill</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 填充</span>
    dc<span class="token punctuation">.</span><span class="token function">SavePNG</span><span class="token punctuation">(</span><span class="token string">&quot;out.png&quot;</span><span class="token punctuation">)</span> <span class="token comment">// 保存到图片文件</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="描点" tabindex="-1"><a class="header-anchor" href="#描点" aria-hidden="true">#</a> 描点</h2><figure><img src="`+u+`" alt="" width="400" height="400" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">TestDot</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   dc <span class="token operator">:=</span> gg<span class="token punctuation">.</span><span class="token function">NewContext</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
   dc<span class="token punctuation">.</span><span class="token function">SetRGB</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
   <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
      dc<span class="token punctuation">.</span><span class="token function">DrawPoint</span><span class="token punctuation">(</span><span class="token function">float64</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token operator">*</span>i<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">float64</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token operator">*</span>i<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token comment">// 设置点的坐标和半径</span>
   <span class="token punctuation">}</span>
   dc<span class="token punctuation">.</span><span class="token function">Fill</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 填充</span>
   dc<span class="token punctuation">.</span><span class="token function">SavePNG</span><span class="token punctuation">(</span><span class="token string">&quot;out.png&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="画线" tabindex="-1"><a class="header-anchor" href="#画线" aria-hidden="true">#</a> 画线</h2><figure><img src="`+l+`" alt="" width="400" height="400" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">TestLines</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   dc <span class="token operator">:=</span> gg<span class="token punctuation">.</span><span class="token function">NewContext</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
   dc<span class="token punctuation">.</span><span class="token function">SetRGB</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
   dc<span class="token punctuation">.</span><span class="token function">SetLineWidth</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span> <span class="token comment">// 设置线宽</span>
   dc<span class="token punctuation">.</span><span class="token function">DrawLine</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
   dc<span class="token punctuation">.</span><span class="token function">DrawLine</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
   dc<span class="token punctuation">.</span><span class="token function">Stroke</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 连线</span>
   dc<span class="token punctuation">.</span><span class="token function">SavePNG</span><span class="token punctuation">(</span><span class="token string">&quot;lines.png&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11);function v(f,h){const a=i("ExternalLinkIcon");return p(),o("div",null,[k,n("p",null,[s("官方仓库："),n("a",d,[s("fogleman/gg: Go Graphics - 2D rendering in Go with a simple API. (github.com)"),t(a)])]),n("p",null,[s("官方文档："),n("a",m,[s("gg package - github.com/fogleman/gg - Go Packages"),t(a)])]),n("p",null,[s("官方示例："),n("a",g,[s("gg/examples at master · fogleman/gg (github.com)"),t(a)])]),b])}const x=e(r,[["render",v],["__file","gg.html.vue"]]);export{x as default};
