import{_ as a,V as t,W as e,X as p,Y as n,Z as i,a0 as c,$ as o,F as l}from"./framework-8edddef6.js";const u={},d=o(`<h1 id="接口" tabindex="-1"><a class="header-anchor" href="#接口" aria-hidden="true">#</a> 接口</h1><p>接口是一个非常重要的概念，它描述了一组抽象的规范，而不提供具体的实现。对于项目而言会使得代码更加优雅可读，对于开发者而言也会减少很多心智负担，代码风格逐渐形成了规范，于是就有了现在人们所推崇的面向接口编程。</p><h2 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念</h2><p>Go关于接口的发展历史有一个分水岭，在Go1.17及以前，官方在参考手册中对于接口的定义为：<strong>一组方法的集合</strong>。</p><blockquote><p><em>An interface type specifies a method set called its interface</em>.</p></blockquote><p>接口实现的定义为</p><blockquote><p><em>A variable of interface type can store a value of any type with a method set that is any superset of the interface. Such a type is said to implement the interface</em></p></blockquote><p>翻译过来就是，当一个类型的方法集是一个接口的方法集的超集时，且该类型的值可以由该接口类型的变量存储，那么称该类型实现了该接口。</p><p>不过在Go1.18时，关于接口的定义发生了变化，接口定义为：<strong>一组类型的集合</strong>。</p><blockquote><p>An interface type defines a <em>type set</em>.</p></blockquote><p>接口实现的定义为</p><blockquote><p><em>A variable of interface type can store a value of any type that is in the type set of the interface. Such a type is said to implement the interface</em></p></blockquote><p>翻译过来就是，当一个类型位于一个接口的类型集内，且该类型的值可以由该接口类型的变量存储，那么称该类型实现了该接口。并且还给出了如下的额外定义。</p><blockquote><p>当如下情况时，可以称类型T实现了接口I</p><ul><li>T不是一个接口，并且是接口I类型集中的一个元素</li><li>T是一个接口，并且T的类型集是接口I类型集的一个子集</li></ul><p>如果T实现了一个接口，那么T的值也实现了该接口。</p></blockquote><p>Go在1.18最大的变化就是加入了泛型，新接口定义就是为了泛型而服务的，不过一点也不影响之前接口的使用，同时接口也分为了两类，</p><ul><li>基本接口(<code>Basic Interface</code>)：<strong>只包含方法集</strong>的接口就是基本接口</li><li>通用接口(<code>General Interface</code>)：<strong>只要包含类型集</strong>的接口就是通用接口</li></ul><p>什么是方法集，方法集就是一组方法的集合，同样的，类型集就是一组类型的集合。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>这一堆概念很死板，理解的时候要根据代码来思考。</p></div><br><h2 id="基本接口" tabindex="-1"><a class="header-anchor" href="#基本接口" aria-hidden="true">#</a> 基本接口</h2><p>前面讲到了基本接口就是方法集，就是一组方法的集合。</p><h3 id="声明" tabindex="-1"><a class="header-anchor" href="#声明" aria-hidden="true">#</a> 声明</h3><p>先来看看接口长什么样子。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Person <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Say</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
	<span class="token function">Walk</span><span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个<code>Person</code>接口，有两个对外暴露的方法<code>Walk</code>和<code>Say</code>，在接口里，函数的参数名变得不再重要，当然如果想加上参数名和返回值名也是允许的。</p><h3 id="初始化" tabindex="-1"><a class="header-anchor" href="#初始化" aria-hidden="true">#</a> 初始化</h3><p>仅仅只有接口是无法被初始化的，因为它仅仅只是一组规范，并没有具体的实现，不过可以被声明。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">var</span> person Person
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> &lt;nil&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h3><p>先来看一个例子，一个建筑公司想一种特殊规格的起重机，于是给出了起重机的特殊规范和图纸，并指明了起重机应该有起重和吊货的功能，<strong>建筑公司并不负责造起重机，只是给出了一个规范，这就叫接口</strong>，于是公司A接下了订单，根据自家公司的独门技术造出了绝世起重机并交给了建筑公司，建筑公司不在乎是用什么技术实现的，也不在乎什么绝世起重机，只要能够起重和吊货就行，仅仅只是当作一台普通起重机来用，<strong>根据规范提供具体的功能，这就叫实现</strong>，。只<strong>根据接口的规范来使用功能，屏蔽其内部实现，这就叫面向接口编程</strong>。过了一段时间，绝世起重机出故障了，公司A也跑路了，于是公司B依据规范造了一台更厉害的巨无霸起重机，由于同样具有起重和吊货的功能，可以与绝世起重机无缝衔接，并不影响建筑进度，建筑得以顺利完成，<strong>内部实现改变而功能不变，不影响之前的使用，可以随意替换，这就是面向接口编程的好处。</strong></p><br><p>接下来会用Go描述上述情形</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 起重机接口</span>
<span class="token keyword">type</span> Crane <span class="token keyword">interface</span> <span class="token punctuation">{</span> 
	<span class="token function">JackUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
	<span class="token function">Hoist</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token comment">// 起重机A</span>
<span class="token keyword">type</span> CraneA <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	work <span class="token builtin">int</span> <span class="token comment">//内部的字段不同代表内部细节不一样</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c CraneA<span class="token punctuation">)</span> <span class="token function">Work</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;使用技术A&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c CraneA<span class="token punctuation">)</span> <span class="token function">JackUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	c<span class="token punctuation">.</span><span class="token function">Work</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token string">&quot;jackup&quot;</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c CraneA<span class="token punctuation">)</span> <span class="token function">Hoist</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	c<span class="token punctuation">.</span><span class="token function">Work</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token string">&quot;hoist&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 起重机B</span>
<span class="token keyword">type</span> CraneB <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	boot <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c CraneB<span class="token punctuation">)</span> <span class="token function">Boot</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;使用技术B&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c CraneB<span class="token punctuation">)</span> <span class="token function">JackUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	c<span class="token punctuation">.</span><span class="token function">Boot</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token string">&quot;jackup&quot;</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c CraneB<span class="token punctuation">)</span> <span class="token function">Hoist</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	c<span class="token punctuation">.</span><span class="token function">Boot</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token string">&quot;hoist&quot;</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> ConstructionCompany <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Crane Crane <span class="token comment">// 只根据Crane类型来存放起重机</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>ConstructionCompany<span class="token punctuation">)</span> <span class="token function">Build</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>Crane<span class="token punctuation">.</span><span class="token function">JackUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>Crane<span class="token punctuation">.</span><span class="token function">Hoist</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;建筑完成&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 使用起重机A</span>
	company <span class="token operator">:=</span> ConstructionCompany<span class="token punctuation">{</span>CraneA<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
	company<span class="token punctuation">.</span><span class="token function">Build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// 更换起重机B</span>
	company<span class="token punctuation">.</span>Crane <span class="token operator">=</span> CraneB<span class="token punctuation">{</span><span class="token punctuation">}</span>
	company<span class="token punctuation">.</span><span class="token function">Build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>使用技术A
jackup
使用技术A
hoist
建筑完成

使用技术B
jackup
使用技术B
hoist
建筑完成
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面例子中，可以观察到接口的实现是隐式的，也对应了官方对于基本接口实现的定义：方法集是接口方法集的超集，所以在Go中，实现一个接口不需要<code>implements</code>关键字显式的去指定要实现哪一个接口，只要是实现了一个接口的全部方法，那就是实现了该接口。有了实现之后，就可以初始化接口了，建筑公司结构体内部声明了一个<code>Crane</code>类型的成员变量，可以保存所有实现了<code>Crane</code>接口的值，由于是<code>Crane</code> 类型的变量，所以能够访问到的方法只有<code>JackUp</code> 和<code>Hoist</code>，内部的其他方法例如<code>Work</code>和<code>Boot</code>都无法访问。</p><br><p>之前提到过任何自定义类型都可以拥有方法，那么根据实现的定义，任何自定义类型都可以实现接口，下面举几个比较特殊的例子。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Person <span class="token keyword">interface</span> <span class="token punctuation">{</span>
   <span class="token function">Say</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
   <span class="token function">Walk</span><span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Man <span class="token keyword">interface</span> <span class="token punctuation">{</span>
   <span class="token function">Exercise</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   Person
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Man</code>接口方法集是<code>Person</code>的超集，所以<code>Man</code>也实现了接口<code>Person</code>，不过这更像是一种&quot;继承&quot;。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Number <span class="token builtin">int</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>n Number<span class="token punctuation">)</span> <span class="token function">Say</span><span class="token punctuation">(</span>s <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token string">&quot;bibibibibi&quot;</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>n Number<span class="token punctuation">)</span> <span class="token function">Walk</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;can not walk&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类型<code>Number</code>的底层类型是<code>int</code>，虽然这放在其他语言中看起来很离谱，但<code>Number</code>的方法集确实是<code>Person</code> 的超集，所以也算实现。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Func <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>f Func<span class="token punctuation">)</span> <span class="token function">Say</span><span class="token punctuation">(</span>s <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token string">&quot;bibibibibi&quot;</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>f Func<span class="token punctuation">)</span> <span class="token function">Walk</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;can not walk&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> function Func
	function <span class="token operator">=</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;do somthing&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token function">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样的，函数类型也可以实现接口。</p><br><h2 id="空接口" tabindex="-1"><a class="header-anchor" href="#空接口" aria-hidden="true">#</a> 空接口</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Any <span class="token keyword">interface</span><span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Any</code>接口内部没有方法集合，根据实现的定义，所有类型都是<code>Any</code>接口的的实现，因为所有类型的方法集都是空集的超集，所以<code>Any</code>接口可以保存任何类型的值。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> anything Any

	anything <span class="token operator">=</span> <span class="token number">1</span>
	<span class="token function">println</span><span class="token punctuation">(</span>anything<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>anything<span class="token punctuation">)</span>

	anything <span class="token operator">=</span> <span class="token string">&quot;something&quot;</span>
	<span class="token function">println</span><span class="token punctuation">(</span>anything<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>anything<span class="token punctuation">)</span>
	
	anything <span class="token operator">=</span> <span class="token function">complex</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
	<span class="token function">println</span><span class="token punctuation">(</span>anything<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>anything<span class="token punctuation">)</span>

	anything <span class="token operator">=</span> <span class="token number">1.2</span>
	<span class="token function">println</span><span class="token punctuation">(</span>anything<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>anything<span class="token punctuation">)</span>

	anything <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token function">println</span><span class="token punctuation">(</span>anything<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>anything<span class="token punctuation">)</span>

	anything <span class="token operator">=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token function">println</span><span class="token punctuation">(</span>anything<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>anything<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>(0xe63580,0xeb8b08)
1
(0xe63d80,0xeb8c48)
something
(0xe62ac0,0xeb8c58)
(1+2i)
(0xe62e00,0xeb8b00)
1.2
(0xe61a00,0xc0000080d8)
[]
(0xe69720,0xc00007a7b0)
map[]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过输出会发现，两种输出的结果不一致，其实接口内部可以看成是一个由<code>(val,type)</code>组成的元组，<code>type</code>是具体类型，在调用方法时会去调用具体类型的具体值。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这也是一个空接口，不过是一个匿名空接口，在开发时通常会使用匿名空接口来表示接收任何类型的值，例子如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token function">DoSomething</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">DoSomething</span><span class="token punctuation">(</span>anything <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> anything
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在后续的更新中，官方提出了另一种解决办法，为了方便起见，可以使用<code>any</code>来替代<code>interace{}</code>，两者是完全等价的，因为前者仅仅只是一个类型别名，如下</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> any <span class="token operator">=</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br><p>在比较空接口时，会对其底层类型进行比较，如果类型不匹配的话则为<code>false</code>，其次才是值的比较，例如</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> a <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token keyword">var</span> b <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	a <span class="token operator">=</span> <span class="token number">1</span>
	b <span class="token operator">=</span> <span class="token string">&quot;1&quot;</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a <span class="token operator">==</span> b<span class="token punctuation">)</span>
	a <span class="token operator">=</span> <span class="token number">1</span>
	b <span class="token operator">=</span> <span class="token number">1</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a <span class="token operator">==</span> b<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出为</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>false
true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果底层的类型是不可比较的，那么会<code>panic</code>，对于Go而言，内置数据类型是否可比较的情况如下</p><table><thead><tr><th>类型</th><th>可比较</th><th>依据</th></tr></thead><tbody><tr><td>数字类型</td><td>是</td><td>值是否相等</td></tr><tr><td>字符串类型</td><td>是</td><td>值是否相等</td></tr><tr><td>数组类型</td><td>是</td><td>数组的全部元素是否相等</td></tr><tr><td>切片类型</td><td>否</td><td>不可比较</td></tr><tr><td>结构体</td><td>是</td><td>字段值是否全部相等</td></tr><tr><td>map类型</td><td>否</td><td>不可比较</td></tr><tr><td>通道</td><td>是</td><td>地址是否相等</td></tr><tr><td>指针</td><td>是</td><td>指针存储的地址是否相等</td></tr><tr><td>接口</td><td>是</td><td>底层所存储的数据是否相等</td></tr></tbody></table><p>在Go中有一个专门的接口类型用于代表所有可比较类型，即<code>comparable</code></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> comparable <span class="token keyword">interface</span><span class="token punctuation">{</span> comparable <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>如果尝试对不可比较的类型进行比较，则会<code>panic</code></p></div><h2 id="通用接口" tabindex="-1"><a class="header-anchor" href="#通用接口" aria-hidden="true">#</a> 通用接口</h2>`,70);function r(k,v){const s=l("RouterLink");return t(),e("div",null,[d,p("p",null,[n("通用接口就是为了泛型服务的，只要掌握了泛型，就掌握了通用接口，请移步"),i(s,{to:"/essential/senior/90.generic.html"},{default:c(()=>[n("泛型")]),_:1})])])}const b=a(u,[["render",r],["__file","85.interface.html.vue"]]);export{b as default};
