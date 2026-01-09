import Header from "../../components/header/header";    
import Hero from "../../components/hero/hero";
import FeaturedProducts from "../../components/featuredProducts/featuredProducts";
import ProductsGrid from "../../components/productsGrid/productsGrid";
import About from "../../components/about/about";
import Contacts from "../../components/contacts/contacts";
import FAQs from "../../components/faqs/faqs";
import Footer from "../../components/footer/footer";

export default function Home() {
    return(
        <div className="min-h-screen bg-white">
            <Header />
            <Hero />
            <FeaturedProducts />
            <ProductsGrid />
            <About />
            <Contacts />
            <FAQs />
            <Footer />
        </div>
    )
}