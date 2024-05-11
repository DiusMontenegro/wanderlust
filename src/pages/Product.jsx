import PageNav from '@/components/PageNav';
import styles from './Product.module.css';

export default function Product() {
    return (
        <main className={styles.product}>
            <PageNav />

            <section>
                <img
                    src="img-1.jpg"
                    alt="person with dog overlooking mountain with sunset"
                    className="w-[100%]"
                />
                <div>
                    <h2>About Wanderlust.</h2>
                    <p>
                        Wanderlust is an innovative travel companion designed to
                        ignite your passion for exploration. With Wanderlust,
                        you can effortlessly plan your next adventure, discover
                        hidden gems around the globe, and connect with
                        like-minded travelers. Whether you're a seasoned
                        globe-trotter or a first-time explorer.
                    </p>
                    <p>
                        Wanderlust provides the tools and inspiration you need
                        to create unforgettable memories. Say goodbye to
                        ordinary and hello to extraordinary with Wanderlust.
                    </p>
                </div>
            </section>
        </main>
    );
}
