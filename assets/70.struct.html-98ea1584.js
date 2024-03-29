import{_ as n,V as s,W as a,$ as e}from"./framework-8edddef6.js";const t={},i=e(`<h1 id="结构体" tabindex="-1"><a class="header-anchor" href="#结构体" aria-hidden="true">#</a> 结构体</h1><p>Go抛弃了类与继承，同时也抛弃了构造方法，刻意弱化了面向对象的功能，Go并非是一个OOP的语言，但是Go依旧有着OOP的影子，通过结构体和方法也可以模拟出一个类。结构体可以存储一组不同类型的数据，是一种复合类型，示例如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Programmer <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Name     <span class="token builtin">string</span>
	Age      <span class="token builtin">int</span>
	Job      <span class="token builtin">string</span>
	Language <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="声明" tabindex="-1"><a class="header-anchor" href="#声明" aria-hidden="true">#</a> 声明</h2><p>结构体的声明非常简单，例子如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   name <span class="token builtin">string</span>
   age <span class="token builtin">int</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结构体本身以及其内部的字段都遵守大小写命名的暴露方式。对于一些类型相同的字段，可以像如下方式声明：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Rectangle <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	height<span class="token punctuation">,</span> width<span class="token punctuation">,</span> area <span class="token builtin">int</span>
	color               <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>在声明结构体字段时，字段名与方法名不应该重复</p></div><br><h2 id="创建" tabindex="-1"><a class="header-anchor" href="#创建" aria-hidden="true">#</a> 创建</h2><p>Go不存在构造方法，大多数情况下采用如下的方式来创建。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>programmer <span class="token operator">:=</span> Programmer<span class="token punctuation">{</span>
   Name<span class="token punctuation">:</span>     <span class="token string">&quot;jack&quot;</span><span class="token punctuation">,</span>
   Age<span class="token punctuation">:</span>      <span class="token number">19</span><span class="token punctuation">,</span>
   Job<span class="token punctuation">:</span>      <span class="token string">&quot;coder&quot;</span><span class="token punctuation">,</span>
   Language<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;Go&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;C++&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>初始化的时候就像<code>map</code>一样指定字段名称再初始化字段值，不过也可以省略字段名称。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>programmer <span class="token operator">:=</span> Programmer<span class="token punctuation">{</span>
   <span class="token string">&quot;jack&quot;</span><span class="token punctuation">,</span>
   <span class="token number">19</span><span class="token punctuation">,</span>
   <span class="token string">&quot;coder&quot;</span><span class="token punctuation">,</span>
   <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;Go&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;C++&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当省略字段名称时，就必须初始化所有字段，且必须按照声明的顺序初始化。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">NewProgrammer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Programmer <span class="token punctuation">{</span>
   <span class="token keyword">return</span> Programmer<span class="token punctuation">{</span>
      <span class="token string">&quot;jack&quot;</span><span class="token punctuation">,</span>
      <span class="token number">19</span><span class="token punctuation">,</span>
      <span class="token string">&quot;coder&quot;</span><span class="token punctuation">,</span>
      <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;Go&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;C++&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以编写一个函数来专门初始化结构体，这类函数通常有另一个名称：工厂方法，这也是为什么Go没有构造方法的原因。</p><br><h2 id="组合" tabindex="-1"><a class="header-anchor" href="#组合" aria-hidden="true">#</a> 组合</h2><p>在Go中，结构体之间的关系是通过组合来表示的，可以显式组合，也可以匿名组合，后者使用起来更类似于继承，但本质上没有任何变化。例如：</p><p>显式组合的方式</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   name <span class="token builtin">string</span>
   age  <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Student <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   p      Person
   school <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Employee <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   p   Person
   job <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在使用时需要显式的指定字段<code>p</code></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>student <span class="token operator">:=</span> Student<span class="token punctuation">{</span>
   p<span class="token punctuation">:</span>      Person<span class="token punctuation">{</span>name<span class="token punctuation">:</span> <span class="token string">&quot;jack&quot;</span><span class="token punctuation">,</span> age<span class="token punctuation">:</span> <span class="token number">18</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
   school<span class="token punctuation">:</span> <span class="token string">&quot;lili school&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>student<span class="token punctuation">.</span>p<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而匿名组合可以不用显式的指定字段</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	name <span class="token builtin">string</span>
	age  <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Student <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Person
	school <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Employee <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Person
	job <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>匿名字段的名称默认为类型名，调用者可以直接访问该类型的字段和方法，但除了更加方便以外与第一种方式没有任何的区别。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>student <span class="token operator">:=</span> Student<span class="token punctuation">{</span>
   Person<span class="token punctuation">:</span> Person<span class="token punctuation">{</span>name<span class="token punctuation">:</span> <span class="token string">&quot;jack&quot;</span><span class="token punctuation">,</span>age<span class="token punctuation">:</span> <span class="token number">18</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
   school<span class="token punctuation">:</span> <span class="token string">&quot;lili school&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>student<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="指针" tabindex="-1"><a class="header-anchor" href="#指针" aria-hidden="true">#</a> 指针</h2><p>对于结构体指针而言，不需要解引用就可以直接访问结构体的内容，例子如下：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>p <span class="token operator">:=</span> <span class="token operator">&amp;</span>Person<span class="token punctuation">{</span>
   name<span class="token punctuation">:</span> <span class="token string">&quot;jack&quot;</span><span class="token punctuation">,</span>
   age<span class="token punctuation">:</span>  <span class="token number">18</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>age<span class="token punctuation">,</span>p<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在编译的时候会转换为<code>(*p).name</code> ，<code>(*p).age</code>，其实还是需要解引用，不过在编码的时候可以省去，算是一种语法糖。</p><br><h2 id="标签" tabindex="-1"><a class="header-anchor" href="#标签" aria-hidden="true">#</a> 标签</h2><p>结构体标签是一种元编程的形式，结合反射可以做出很多奇妙的功能，格式如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token string">\`key1:&quot;val1&quot; key2:&quot;val2&quot;\`</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>标签是一种键值对的形式，使用空格进行分隔。结构体标签的容错性很低，如果没能按照正确的格式书写结构体，那么将会导致无法正常读取，但是在编译时却不会有任何的报错，下方是一个使用示例。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Programmer <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    Name     <span class="token builtin">string</span> <span class="token string">\`json:&quot;name&quot;\`</span>
    Age      <span class="token builtin">int</span> <span class="token string">\`yaml:&quot;age&quot;\`</span>
    Job      <span class="token builtin">string</span> <span class="token string">\`toml:&quot;job&quot;\`</span>
    Language <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token string">\`properties:&quot;language&quot;\`</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结构体标签最广泛的应用就是在各种序列化格式中的别名定义，标签的使用需要结合反射才能完整发挥出其功能。</p><h2 id="空结构体" tabindex="-1"><a class="header-anchor" href="#空结构体" aria-hidden="true">#</a> 空结构体</h2><p>空结构体没有字段，不占用内存空间，可以通过<code>unsafe.SizeOf</code>函数来计算占用的字节大小</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">type</span> Empty <span class="token keyword">struct</span> <span class="token punctuation">{</span>
      
   <span class="token punctuation">}</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span>Empty<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>空结构体的使用场景有很多，比如之前提到过的，作为<code>map</code>的值类型，可以将<code>map</code>作为<code>set</code>来进行使用，又或者是作为通道的类型，即代表一个不发送数据的通道。</p>`,47),p=[i];function o(c,l){return s(),a("div",null,p)}const d=n(t,[["render",o],["__file","70.struct.html.vue"]]);export{d as default};
