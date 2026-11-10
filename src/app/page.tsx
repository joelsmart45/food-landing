export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-green-600 text-white shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🥗</span>
              <h1 className="text-2xl font-bold">FreshBites</h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="hover:text-green-200 transition">Home</a>
              <a href="#menu" className="hover:text-green-200 transition">Menu</a>
              <a href="#about" className="hover:text-green-200 transition">About</a>
              <a href="#contact" className="hover:text-green-200 transition">Contact</a>
            </div>
            <button className="bg-white text-green-600 px-6 py-2 rounded-full font-semibold hover:bg-green-100 transition">
              Order Now
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Freshness You Can Taste!
              </h2>
              <p className="text-xl mb-8 text-green-100">
                Delicious, fresh, and healthy meals made just for you. Fresh, locally sourced ingredients delivered to your doorstep.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-100 transition">
                  View Menu
                </button>
                <button className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-600 transition">
                  Order Now
                </button>
              </div>
            </div>
            <div className="text-center">
              <span className="text-9xl">🥗</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose FreshBites</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Fresh, Locally Sourced</h3>
              <p className="text-gray-600">We use only the freshest, locally sourced ingredients</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Quick & Reliable Delivery</h3>
              <p className="text-gray-600">Hot meals delivered to your doorstep quickly and reliably</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Affordable Prices</h3>
              <p className="text-gray-600">Delicious meals at affordable prices for everyone</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Popular Menu</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Classic Pancakes", price: "₦2,500", emoji: "🥞", desc: "Fluffy pancakes served with syrup and fresh fruit" },
              { name: "Omelette Deluxe", price: "₦2,000", emoji: "🍳", desc: "Eggs, cheese, tomatoes, onions, and peppers" },
              { name: "Grilled Chicken Salad", price: "₦3,500", emoji: "🥗", desc: "Mixed greens with juicy grilled chicken and homemade dressing" },
              { name: "Veggie Wrap", price: "₦2,800", emoji: "🌯", desc: "Fresh veggies wrapped in warm tortilla with a tangy sauce" },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="bg-green-100 h-40 flex items-center justify-center">
                  <span className="text-6xl">{item.emoji}</span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1 text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{item.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 font-bold text-lg">{item.price}</span>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-xl mb-8 text-green-100">
            Call us at +234 800 123 4567 or email orders@freshbites.ng to place your order
          </p>
          <button className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-100 transition text-lg">
            Order Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🥗</span>
                <h3 className="text-xl font-bold">FreshBites</h3>
              </div>
              <p className="text-gray-400">Freshness you can taste! Fresh, locally sourced ingredients since today.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-white transition">Home</a></li>
                <li><a href="#menu" className="hover:text-white transition">Menu</a></li>
                <li><a href="#about" className="hover:text-white transition">About</a></li>
                <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 +234 800 123 4567</li>
                <li>✉️ support@freshbites.ng</li>
                <li>📍 Benin City, Edo State, Nigeria</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">How to Order</h4>
              <ul className="space-y-2 text-gray-400">
                <li>1. Browse our menu</li>
                <li>2. Call or email us</li>
                <li>3. Specify items & delivery address</li>
                <li>4. Enjoy your fresh meal!</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 FreshBites. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
