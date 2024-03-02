import{_ as n,V as s,W as a,$ as t}from"./framework-8edddef6.js";const p={},e=t(`<h1 id="http" tabindex="-1"><a class="header-anchor" href="#http" aria-hidden="true">#</a> http</h1><p>Go语言标准库中的<code>net/http</code>包十分的优秀，提供了非常完善的HTTP客户端与服务端的实现，仅通过几行代码就可以搭建一个非常简单的HTTP服务器。</p><p>几乎所有的go语言中的web框架，都是对已有的http包做的封装与修改，因此，十分建议学习其他框架前先行掌握http包。</p><h2 id="get示例" tabindex="-1"><a class="header-anchor" href="#get示例" aria-hidden="true">#</a> Get示例</h2><p>关于Http相关的知识这里不再赘述，想要了解更多的话可以去百度。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;https://baidu.com&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	content<span class="token punctuation">,</span> err <span class="token operator">:=</span> io<span class="token punctuation">.</span><span class="token function">ReadAll</span><span class="token punctuation">(</span>resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过直接调用Http包下的函数就可以发起简单的请求，会返回一个指针与错误，调用过后必须将其手动关闭。</p><h2 id="post示例" tabindex="-1"><a class="header-anchor" href="#post示例" aria-hidden="true">#</a> Post示例</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   person <span class="token operator">:=</span> Person<span class="token punctuation">{</span>
      UserId<span class="token punctuation">:</span>   <span class="token string">&quot;120&quot;</span><span class="token punctuation">,</span>
      Username<span class="token punctuation">:</span> <span class="token string">&quot;jack&quot;</span><span class="token punctuation">,</span>
      Age<span class="token punctuation">:</span>      <span class="token number">18</span><span class="token punctuation">,</span>
      Address<span class="token punctuation">:</span>  <span class="token string">&quot;usa&quot;</span><span class="token punctuation">,</span>
   <span class="token punctuation">}</span>

   json<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">Marshal</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span>
   reader <span class="token operator">:=</span> bytes<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span>

   resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">Post</span><span class="token punctuation">(</span><span class="token string">&quot;https://golang.org&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;application/json;charset=utf-8&quot;</span><span class="token punctuation">,</span> reader<span class="token punctuation">)</span>
   <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
      fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">defer</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="客户端" tabindex="-1"><a class="header-anchor" href="#客户端" aria-hidden="true">#</a> 客户端</h2><p>一般情况下，我们都不会直接使用上述的方法，而且会自己配置一个客户端来达到更加细致化的需求。这将会用到<code>http.Client{}</code>结构体，可提供的配置项总共有四个:</p><ul><li><code>Transport</code>:配置Http客户端数据传输相关的配置项，没有就采用默认的策略</li><li><code>Timeout</code>：请求超时时间配置</li><li><code>Jar</code>：Cookie相关配置</li><li><code>CheckRedirect</code>：重定向配置</li></ul><h2 id="简单示例" tabindex="-1"><a class="header-anchor" href="#简单示例" aria-hidden="true">#</a> <strong>简单示例</strong></h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span><span class="token punctuation">}</span>
	request<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewRequest</span><span class="token punctuation">(</span><span class="token string">&quot;GET&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;https://golang.org&quot;</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	resp<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span>
	<span class="token keyword">defer</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="增加header" tabindex="-1"><a class="header-anchor" href="#增加header" aria-hidden="true">#</a> <strong>增加header</strong></h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span><span class="token punctuation">}</span>
   request<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewRequest</span><span class="token punctuation">(</span><span class="token string">&quot;GET&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;https://golang.org&quot;</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
   request<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;Authorization&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;123456&quot;</span><span class="token punctuation">)</span>
   resp<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span>
   <span class="token keyword">defer</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一些详细的配置这里不会做过多的赘述，还请自行了解。</p><h2 id="服务端" tabindex="-1"><a class="header-anchor" href="#服务端" aria-hidden="true">#</a> 服务端</h2><p>对于go而言，创建一个http服务器只需要一行代码。</p><p>第一个参数是监听的地址，第二个参数是处理器，如果为空的话则使用默认的处理器。大多数情况下使用默认的处理器DefaultServeMux即可。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token string">&quot;localhost:8080&quot;</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="自定义" tabindex="-1"><a class="header-anchor" href="#自定义" aria-hidden="true">#</a> <strong>自定义</strong></h2><p>当然也可以自定义配置一个服务端</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   server <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Server<span class="token punctuation">{</span>
      Addr<span class="token punctuation">:</span>              <span class="token string">&quot;:8080&quot;</span><span class="token punctuation">,</span>
      Handler<span class="token punctuation">:</span>           <span class="token boolean">nil</span><span class="token punctuation">,</span>
      TLSConfig<span class="token punctuation">:</span>         <span class="token boolean">nil</span><span class="token punctuation">,</span>
      ReadTimeout<span class="token punctuation">:</span>       <span class="token number">0</span><span class="token punctuation">,</span>
      ReadHeaderTimeout<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      WriteTimeout<span class="token punctuation">:</span>      <span class="token number">0</span><span class="token punctuation">,</span>
      IdleTimeout<span class="token punctuation">:</span>       <span class="token number">0</span><span class="token punctuation">,</span>
      MaxHeaderBytes<span class="token punctuation">:</span>    <span class="token number">0</span><span class="token punctuation">,</span>
      TLSNextProto<span class="token punctuation">:</span>      <span class="token boolean">nil</span><span class="token punctuation">,</span>
      ConnState<span class="token punctuation">:</span>         <span class="token boolean">nil</span><span class="token punctuation">,</span>
      ErrorLog<span class="token punctuation">:</span>          <span class="token boolean">nil</span><span class="token punctuation">,</span>
      BaseContext<span class="token punctuation">:</span>       <span class="token boolean">nil</span><span class="token punctuation">,</span>
      ConnContext<span class="token punctuation">:</span>       <span class="token boolean">nil</span><span class="token punctuation">,</span>
   <span class="token punctuation">}</span>
   server<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一些详细的配置请自行了解。</p><h2 id="路由" tabindex="-1"><a class="header-anchor" href="#路由" aria-hidden="true">#</a> <strong>路由</strong></h2><p>首先需要首先自定义一个结构体实现<code>Handler</code>接口中的<code>ServeHTTP(ResponseWriter, *Request)</code>方法，再调用<code>http.handle()</code>函数即可</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   http<span class="token punctuation">.</span><span class="token function">Handle</span><span class="token punctuation">(</span><span class="token string">&quot;/index&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>MyHandler<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
   http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token string">&quot;:8080&quot;</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> MyHandler <span class="token keyword">struct</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>h <span class="token operator">*</span>MyHandler<span class="token punctuation">)</span> <span class="token function">ServeHTTP</span><span class="token punctuation">(</span>writer http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;my implement&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是每一次都要自定义一个结构体将会十分的繁琐，也可以直接<code>http.handlerFunc</code>函数，我们只需要写处理函数即可，从而不用创建结构体。其内部是使用了适配器类型<code>HandlerFunc</code>,HandlerFunc类型是一个适配器，允许将普通函数用作HTTP的处理器。如果f是具有适当签名的函数，HandlerFunc(f)是调用f的Handler。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/index&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>responseWriter http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>responseWriter<span class="token punctuation">,</span> <span class="token string">&quot;index&quot;</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span><span class="token punctuation">)</span>
   http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token string">&quot;:8080&quot;</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>ServerMux</code>是核心结构体，实现了基本的方法，<code>DefaultServeMux</code>是的默认实例。</p><h2 id="反向代理" tabindex="-1"><a class="header-anchor" href="#反向代理" aria-hidden="true">#</a> <strong>反向代理</strong></h2><p>http包提供了开箱即用的反向代理功能</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">&quot;/forward&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>writer http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      director <span class="token operator">:=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>request <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
         request<span class="token punctuation">.</span>URL<span class="token punctuation">.</span>Scheme <span class="token operator">=</span> <span class="token string">&quot;https&quot;</span>
         request<span class="token punctuation">.</span>URL<span class="token punctuation">.</span>Host <span class="token operator">=</span> <span class="token string">&quot;golang.org&quot;</span>
         request<span class="token punctuation">.</span>URL<span class="token punctuation">.</span>Path <span class="token operator">=</span> <span class="token string">&quot;index&quot;</span>
      <span class="token punctuation">}</span>

      proxy <span class="token operator">:=</span> httputil<span class="token punctuation">.</span>ReverseProxy<span class="token punctuation">{</span>Director<span class="token punctuation">:</span> director<span class="token punctuation">}</span>
      proxy<span class="token punctuation">.</span><span class="token function">ServeHTTP</span><span class="token punctuation">(</span>writer<span class="token punctuation">,</span> request<span class="token punctuation">)</span>

   <span class="token punctuation">}</span><span class="token punctuation">)</span>

   http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token string">&quot;:8080&quot;</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码会将所有请求转发到<code>https://golang.org/index</code>。</p>`,35),o=[e];function c(i,u){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","http.html.vue"]]);export{r as default};