export default function Hero() {
  return (
    <section className="relative bg-amber-950 text-amber-50 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-amber-950/95 via-amber-950/85 to-amber-950/70 z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070')",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-20 max-w-screen mx-auto px-4 py-24 md:py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-900/50 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              {/* <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg> */}
              <span className="text-amber-200 text-sm font-medium">Since 1995</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Welcome to <span className="text-amber-400">Bayley's</span>
              <br />
              <span className="text-amber-200">Restaurant</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-amber-100 mb-8 max-w-2xl mx-auto lg:mx-0">
              Experience culinary excellence in a warm, inviting atmosphere. 
              Where every dish tells a story and every meal becomes a memory.
            </p>
          </div>

          {/* Right Content - Hero Image */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-700/50">
                <img 
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=987" 
                  alt="Delicious restaurant food"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-amber-600/20 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-amber-950 to-transparent z-20"></div>
    </section>
  );
}