import Layout from "../components/layout";
import "./construction.css"
export default function WorkingOnIt() {
  return (
    <Layout>
            <main className="working-main">
                <div className="image-container">
                <img 
                    src="/working.png" 
                    alt="Under Construction" 
                    className="working-image"
                />
                </div>
                <div className="text-center">
                <h1 className="title-work">We're Working on It</h1>
                <p className="subtitle">
                    Our site is under construction. Check back soon!
                </p>
                </div>
            </main>
    </Layout>
    );
}