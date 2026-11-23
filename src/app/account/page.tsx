import Link from "next/link";
import { getProfile, getOrders } from "@/lib/supabase/actions";

export default async function Account() {
  const profile = await getProfile();
  const orders = await getOrders();

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Not authenticated</h2>
          <p className="mt-2 text-gray-600">
            Please sign in to view your account.
          </p>
          <Link
            href="/login"
            className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">
              Account Settings
            </h1>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-green-600 font-medium transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Settings */}
          <div className="lg:w-1/2 space-y-6">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Profile Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-600">
                  Manage your account details.
                </p>
              </div>
              <form className="px-4 py-5 sm:p-6 space-y-6">
                <div>
                  <label
                    htmlFor="full_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full name
                  </label>
                  <div className="mt-1">
                    <input
                      id="full_name"
                      name="full_name"
                      type="text"
                      defaultValue={profile.full_name || ""}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone number
                  </label>
                  <div className="mt-1">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      defaultValue={profile.phone || ""}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="pt-4">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Orders */}
          <div className="lg:w-1/2 space-y-6">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Recent Orders
                </h3>
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {(orders && orders.length > 0) ? (
                    orders.map((order) => (
                      <li key={order.id} className="px-4 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            Order #{order.order_reference}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            ₦{order.total.toLocaleString()}
                          </p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : order.status === "confirmed" || order.status === "preparing" || order.status === "ready_for_pickup" || order.status === "out_for_delivery"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "refunded"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                          >
                            {order.status.replace(/_/g, " ").toUpperCase()}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className={`text-sm font-medium ${
                            order.payment_status === "paid"
                              ? "text-green-600"
                              : order.payment_status === "failed"
                              ? "text-red-600"
                              : "text-gray-600"
                          }`}
                          >
                            {order.payment_status.replace(/_/g, " ").toUpperCase()}
                          </span>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-5 text-center text-sm text-gray-500">
                      No orders yet.
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
