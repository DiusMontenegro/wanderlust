// Uses the same styles as Product
import PageNav from '@/components/PageNav';
import styles from './Product.module.css';

export default function Product() {
    return (
        <main className={styles.product}>
            <PageNav />

            <section>
                <div>
                    <h2>
                        Simple pricing.
                        <br />
                        Just $9/month.
                    </h2>
                    <p>
                        Unlock a world of possibilities and embark on your next
                        adventure without breaking the bank. Ready to wander?
                        Subscribe now.
                    </p>
                </div>
                <img
                    src="img-2.jpg"
                    alt="overview of a large city with skyscrapers"
                />
            </section>
        </main>
    );
}
