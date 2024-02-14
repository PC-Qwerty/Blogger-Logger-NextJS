import styles from "./footer.module.css";
export default function Footer() {
  return (
    <footer className={`bg-gray-800 text-white p-8 ${styles.footer}`}>
      <div className="container mx-auto flex flex-wrap">
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          {/* <Image src="your-logo.png" alt="Your Logo" width={} /> */}
          <h1>Blogger Logger</h1>
        </div>

        <div className="w-full md:w-1/4 md:ml-auto">
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <p>Email: info@example.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>

        <div className="w-full md:w-1/4 mt-4 md:mt-0">
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-1/4 mt-4 md:mt-0">
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex">
            <a href="#" className="mr-4">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="mr-4">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="mr-4">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
