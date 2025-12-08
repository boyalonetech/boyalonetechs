import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

export default function GoogleReviewSection() {
  return (
    <section className="w-full py-12  text-center">
      <div className="max-w-xl mx-auto sk shadow-lg rounded-2xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold mb-3">Write a Review on Google</h2>
        <p className="text-gray-600 mb-6">
          Your feedback helps others trust my services and helps my business
          grow.
        </p>

        <Link
          href="https://g.page/r/Cf-SGCArv0RcEBM/review"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-xl text-lg font-medium hover:bg-blue-700 transition-all"
        >
          <FaGoogle className="text-xl" />
          Write a Review
        </Link>
      </div>
    </section>
  );
}
