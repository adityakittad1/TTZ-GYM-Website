import React from 'react';
import { Star } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import './Testimonials.css';

/**
 * Testimonials — Pull-quote first, then 2-col grid.
 * All 6 original testimonials preserved exactly.
 */
const TESTIMONIALS = [
  {
    name: 'Rajesh Patil',
    text: 'TTZ Fitness has completely transformed my life! The trainers are knowledgeable and supportive. Lost 15kg in 6 months!',
    result: 'Fat Loss: 15 kg',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    text: 'Best gym in Chhatrapati Sambhajinagar! The nutrition guidance from Mrs. Birajdar has been invaluable. Highly recommend!',
    result: 'Fitness Journey: 8 months',
    rating: 5,
  },
  {
    name: 'Amit Deshmukh',
    text: 'Amazing trainers and great atmosphere! The personal training sessions helped me achieve my muscle gain goals faster than expected.',
    result: 'Muscle Gain: 8 kg',
    rating: 5,
  },
  {
    name: 'Sneha Kulkarni',
    text: "Love the variety of classes! From Zumba to Yoga, there's something for everyone. The community here is so motivating!",
    result: 'Overall Fitness',
    rating: 5,
  },
  {
    name: 'Vikram Jadhav',
    text: "The personalised nutrition plans made all the difference. Mr. Birajdar's expertise helped me reach my fitness goals efficiently.",
    result: 'Body Transformation',
    rating: 5,
  },
  {
    name: 'Anita Rathod',
    text: 'Clean facility, modern equipment, and professional trainers. TTZ Fitness is worth every rupee. My health has improved significantly!',
    result: 'Health Improvement',
    rating: 5,
  },
];

const Stars = ({ n }) => (
  <div className="testimonials__stars" aria-label={`${n} out of 5 stars`}>
    {[...Array(n)].map((_, i) => (
      <Star key={i} size={13} fill="#C9A84C" color="#C9A84C" />
    ))}
  </div>
);

const Testimonials = () => {
  const ref = useScrollReveal();
  const [featured, ...rest] = TESTIMONIALS;

  return (
    <section id="testimonials" className="testimonials" ref={ref}>
      <div className="section-container">

        {/* Header */}
        <div className="testimonials__header reveal">
          <span className="section-eyebrow">Real Results</span>
          <h2 className="testimonials__title">Success Stories</h2>
          <div className="testimonials__rating-strip">
            <Stars n={5} />
            <span className="testimonials__rating-label">
              Rated 5 stars by our members
            </span>
          </div>
        </div>

        {/* Featured pull-quote */}
        <div className="testimonials__featured reveal">
          <blockquote className="testimonials__pullquote">
            "{featured.text}"
          </blockquote>
          <div className="testimonials__feat-footer">
            <div className="testimonials__feat-avatar">{featured.name.charAt(0)}</div>
            <div>
              <div className="testimonials__feat-name">{featured.name}</div>
              <div className="testimonials__feat-result">{featured.result}</div>
            </div>
          </div>
        </div>

        {/* 2-col grid of remaining testimonials */}
        <div className="testimonials__grid">
          {rest.map((t, i) => (
            <div
              key={t.name}
              className="testimonials__card reveal"
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            >
              <p className="testimonials__text">"{t.text}"</p>
              <div className="testimonials__footer">
                <div className="testimonials__avatar">{t.name.charAt(0)}</div>
                <div>
                  <div className="testimonials__name">{t.name}</div>
                  <div className="testimonials__result">{t.result}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="testimonials__cta reveal">
          <p className="testimonials__cta-text">
            Ready to write your own success story?
          </p>
          <a
            href="https://wa.link/z36oiv"
            target="_blank"
            rel="noopener noreferrer"
            className="testimonials__cta-btn"
          >
            Join TTZ Fitness Today
          </a>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;