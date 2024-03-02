import{_ as t,V as e,W as p,X as n,Y as s,Z as o,$ as c,F as i}from"./framework-8edddef6.js";const l={},u=n("h1",{id:"strconv",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#strconv","aria-hidden":"true"},"#"),s(" strconv")],-1),d={href:"https://pkg.go.dev/strconv@go1.19.4",target:"_blank",rel:"noopener noreferrer"},r=c(`<p>包 strconv 实现与基本数据类型的字符串表示形式之间的转换</p><h2 id="导入" tabindex="-1"><a class="header-anchor" href="#导入" aria-hidden="true">#</a> 导入</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;strconv&quot;</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面将会以例子的形式演示如何使用。</p><h2 id="字符串转整型" tabindex="-1"><a class="header-anchor" href="#字符串转整型" aria-hidden="true">#</a> 字符串转整型</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Atoi</span><span class="token punctuation">(</span>s <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>s</code> - 要转换的字符串</li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">TestAoti</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	ints<span class="token punctuation">,</span> err <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">Atoi</span><span class="token punctuation">(</span><span class="token string">&quot;456789&quot;</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>ints<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>=== RUN   TestAoti
456789 &lt;nil&gt;
--- PASS: TestAoti (0.00s)
PASS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="整型转字符串" tabindex="-1"><a class="header-anchor" href="#整型转字符串" aria-hidden="true">#</a> 整型转字符串</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Itoa</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>i</code> - 要转换的整型数字</li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">TestIota</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   str <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">Itoa</span><span class="token punctuation">(</span><span class="token number">114</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>=== RUN   TestIota
114
--- PASS: TestIota (0.00s)
PASS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="字符串转布尔值" tabindex="-1"><a class="header-anchor" href="#字符串转布尔值" aria-hidden="true">#</a> 字符串转布尔值</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">ParseBool</span><span class="token punctuation">(</span>str <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">bool</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>s</code> - 要转换的字符串</li></ul><p>够转换的字符串如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&quot;1&quot;, &quot;t&quot;, &quot;T&quot;, &quot;true&quot;, &quot;TRUE&quot;, &quot;True&quot; // true
&quot;0&quot;, &quot;f&quot;, &quot;F&quot;, &quot;false&quot;, &quot;FALSE&quot;, &quot;False&quot; // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">TestAtob</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   parseBool<span class="token punctuation">,</span> err <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">ParseBool</span><span class="token punctuation">(</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>parseBool<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    
   b<span class="token punctuation">,</span> err <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">ParseBool</span><span class="token punctuation">(</span><span class="token string">&quot;true&quot;</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>b<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    
   b2<span class="token punctuation">,</span> err <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">ParseBool</span><span class="token punctuation">(</span><span class="token string">&quot;FALSE&quot;</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>b2<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>=== RUN   TestAotb
true &lt;nil&gt;
true &lt;nil&gt;
false &lt;nil&gt;
--- PASS: TestAotb (0.00s)
PASS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="布尔值转字符串" tabindex="-1"><a class="header-anchor" href="#布尔值转字符串" aria-hidden="true">#</a> 布尔值转字符串</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">FormatBool</span><span class="token punctuation">(</span>b <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>b</code> - 布尔值</li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">TestBota</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strconv<span class="token punctuation">.</span><span class="token function">FormatBool</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strconv<span class="token punctuation">.</span><span class="token function">FormatBool</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>=== RUN   TestBota
true
false
--- PASS: TestBota (0.00s)
PASS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="转换成go字符串" tabindex="-1"><a class="header-anchor" href="#转换成go字符串" aria-hidden="true">#</a> 转换成Go字符串</h2><p>两者都会将字符串转换为带引号的Go字符串，区别在于后者会将非ASCII字符转通过<code>\\u</code>转义。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">TestQuote</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strconv<span class="token punctuation">.</span><span class="token function">Quote</span><span class="token punctuation">(</span><span class="token string">&quot;hello 世界&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strconv<span class="token punctuation">.</span><span class="token function">QuoteToASCII</span><span class="token punctuation">(</span><span class="token string">&quot;hello 世界&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>=== RUN   TestQuote
&quot;hello 世界&quot;
&quot;hello \\u4e16\\u754c&quot;
--- PASS: TestQuote (0.00s)
PASS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="字符串转浮点数" tabindex="-1"><a class="header-anchor" href="#字符串转浮点数" aria-hidden="true">#</a> 字符串转浮点数</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">ParseFloat</span><span class="token punctuation">(</span>s <span class="token builtin">string</span><span class="token punctuation">,</span> bitSize <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">float64</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>s</code> - 要转换的字符串</li><li><code>bitSize</code> - 位数</li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">TestParseFloat</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   float<span class="token punctuation">,</span> err <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">ParseFloat</span><span class="token punctuation">(</span><span class="token string">&quot;1.145114&quot;</span><span class="token punctuation">,</span> <span class="token number">64</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>float<span class="token punctuation">,</span> err<span class="token punctuation">)</span>

   float<span class="token punctuation">,</span> err <span class="token operator">=</span> strconv<span class="token punctuation">.</span><span class="token function">ParseFloat</span><span class="token punctuation">(</span><span class="token string">&quot;2.3333333333333333333&quot;</span><span class="token punctuation">,</span> <span class="token number">64</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>float<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>=== RUN   TestFloat
1.145114 &lt;nil&gt;
2.3333333333333335 &lt;nil&gt;
--- PASS: TestFloat (0.00s)
PASS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="浮点数转字符串" tabindex="-1"><a class="header-anchor" href="#浮点数转字符串" aria-hidden="true">#</a> 浮点数转字符串</h2><p>字符串在转换浮点数时，官方给出了几种格式方法，以便输出不同的样式。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// &#39;b&#39; (-ddddp±ddd, 二进制指数),
// &#39;e&#39; (-d.dddde±dd, 小写e十进制指数),
// &#39;E&#39; (-d.ddddE±dd, 大写E的十进制指数),
// &#39;f&#39; (-ddd.dddd, 没有指数), // 没有特殊需求一般都用这个
// &#39;g&#39; (对于大指数采用&#39;e&#39;的格式， 小指数采用&#39;f&#39;的格式),
// &#39;G&#39; (对于大指数采用&#39;e&#39;的格式， 小指数采用&#39;f&#39;的格式)，
// &#39;x&#39; (-0xd.ddddp±ddd, 十六进制分数和二进制指数), 
// &#39;X&#39; (-0Xd.ddddP±ddd, 十六进制分数和二进制指数).
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>转换函数</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">FormatFloat</span><span class="token punctuation">(</span>f <span class="token builtin">float64</span><span class="token punctuation">,</span> fmt <span class="token builtin">byte</span><span class="token punctuation">,</span> prec<span class="token punctuation">,</span> bitSize <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>f - 指要转换的浮点数</li><li>fmt - 指的是格式化类型</li><li>prec - 指的是精度，除了<code>g/G</code>的情况是表示最大有效位数，其他情况都表示的是保留小数到后几位，</li><li>bitzise - 指的是位数</li></ul><p>当然一般情况都是使用<code>f</code>直接转换小数的格式最多。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">TestFormatFloat</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   f <span class="token operator">:=</span> <span class="token number">1315643.14159261234567891011</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strconv<span class="token punctuation">.</span><span class="token function">FormatFloat</span><span class="token punctuation">(</span>f<span class="token punctuation">,</span> <span class="token char">&#39;f&#39;</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">64</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strconv<span class="token punctuation">.</span><span class="token function">FormatFloat</span><span class="token punctuation">(</span>f<span class="token punctuation">,</span> <span class="token char">&#39;b&#39;</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">64</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strconv<span class="token punctuation">.</span><span class="token function">FormatFloat</span><span class="token punctuation">(</span>f<span class="token punctuation">,</span> <span class="token char">&#39;e&#39;</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">64</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strconv<span class="token punctuation">.</span><span class="token function">FormatFloat</span><span class="token punctuation">(</span>f<span class="token punctuation">,</span> <span class="token char">&#39;x&#39;</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">64</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strconv<span class="token punctuation">.</span><span class="token function">FormatFloat</span><span class="token punctuation">(</span>f<span class="token punctuation">,</span> <span class="token char">&#39;g&#39;</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">64</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strconv<span class="token punctuation">.</span><span class="token function">FormatFloat</span><span class="token punctuation">(</span><span class="token number">1.111</span><span class="token punctuation">,</span> <span class="token char">&#39;g&#39;</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">64</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>=== RUN   TestFormatFloat
1315643.141593
5650644266346967p-32
1.315643e+06
0x1.4133b2p+20
1.31564e+06
1.111
--- PASS: TestFormatFloat (0.00s)
PASS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="字符串转复数" tabindex="-1"><a class="header-anchor" href="#字符串转复数" aria-hidden="true">#</a> 字符串转复数</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">ParseComplex</span><span class="token punctuation">(</span>s <span class="token builtin">string</span><span class="token punctuation">,</span> bitSize <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">complex128</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>s</code> - 要转换的字符串</li><li><code>bitSize</code> - 位数</li></ul><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">TestParseComplex</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strconv<span class="token punctuation">.</span><span class="token function">ParseComplex</span><span class="token punctuation">(</span><span class="token string">&quot;1+2i&quot;</span><span class="token punctuation">,</span> <span class="token number">128</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strconv<span class="token punctuation">.</span><span class="token function">ParseComplex</span><span class="token punctuation">(</span><span class="token string">&quot;1+2j&quot;</span><span class="token punctuation">,</span> <span class="token number">128</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>=== RUN   TestParseComplex
(1+2i) &lt;nil&gt;
(0+0i) strconv.ParseComplex: parsing &quot;1+2j&quot;: invalid syntax
--- PASS: TestParseComplex (0.00s)
PASS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="复数转字符串" tabindex="-1"><a class="header-anchor" href="#复数转字符串" aria-hidden="true">#</a> 复数转字符串</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">FormatComplex</span><span class="token punctuation">(</span>c <span class="token builtin">complex128</span><span class="token punctuation">,</span> fmt <span class="token builtin">byte</span><span class="token punctuation">,</span> prec<span class="token punctuation">,</span> bitSize <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>c</code>- 复数</p><p><code>fmt</code> - 格式化类型，参考浮点数格式化类型</p><p><code>prec</code> - 参考浮点数精度</p><p><code>bitsize</code> - 位数</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">TestFormatComplex</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strconv<span class="token punctuation">.</span><span class="token function">FormatComplex</span><span class="token punctuation">(</span><span class="token function">complex</span><span class="token punctuation">(</span><span class="token number">1.1</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token char">&#39;f&#39;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">128</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strconv<span class="token punctuation">.</span><span class="token function">FormatComplex</span><span class="token punctuation">(</span><span class="token function">complex</span><span class="token punctuation">(</span><span class="token number">5.6</span><span class="token punctuation">,</span> <span class="token number">2.8</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token char">&#39;b&#39;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">128</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>strconv<span class="token punctuation">.</span><span class="token function">FormatComplex</span><span class="token punctuation">(</span><span class="token function">complex</span><span class="token punctuation">(</span><span class="token number">18.88999</span><span class="token punctuation">,</span> <span class="token number">89.7</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token char">&#39;g&#39;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">128</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>=== RUN   TestFormatComplex
(1.10+12.00i)
(6305039478318694p-50+6305039478318694p-51i)
(19+90i)
--- PASS: TestFormatComplex (0.00s)
PASS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="字符串追加数据" tabindex="-1"><a class="header-anchor" href="#字符串追加数据" aria-hidden="true">#</a> 字符串追加数据</h2><p>在其他语言比如java中<code>&quot;1&quot;+1</code>的结果是<code>&quot;11&quot;</code>，java会自动完成类型转换，而在Go语言中这样的操作是不被允许的，因为两者的数据类型不同。所以需要用到<code>strconv</code>下的Append函数 ，具体的参数与上面对于的数据转换函数一致。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">TestAppend</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   bytes <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token string">&quot;这里有一些数据:&quot;</span><span class="token punctuation">)</span>
   bytes <span class="token operator">=</span> strconv<span class="token punctuation">.</span><span class="token function">AppendInt</span><span class="token punctuation">(</span>bytes<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
   bytes <span class="token operator">=</span> strconv<span class="token punctuation">.</span><span class="token function">AppendFloat</span><span class="token punctuation">(</span>bytes<span class="token punctuation">,</span> <span class="token number">1.2222</span><span class="token punctuation">,</span> <span class="token char">&#39;f&#39;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">64</span><span class="token punctuation">)</span>
   bytes <span class="token operator">=</span> strconv<span class="token punctuation">.</span><span class="token function">AppendBool</span><span class="token punctuation">(</span>bytes<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>=== RUN   TestAppend
这里有一些数据:101.22false
--- PASS: TestAppend (0.00s)
PASS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,61);function k(v,m){const a=i("ExternalLinkIcon");return e(),p("div",null,[u,n("p",null,[s("官方文档："),n("a",d,[s("strconv package - strconv - Go Packages"),o(a)])]),r])}const g=t(l,[["render",k],["__file","strconv.html.vue"]]);export{g as default};
