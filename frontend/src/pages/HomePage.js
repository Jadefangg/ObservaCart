import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-modern">
        <div className="container-modern">
          <div className="hero-content animate-fade-in-up">
            <h1 className="hero-title">
              The Future of 
              <span style={{ display: 'block', color: 'var(--text-accent-light)' }}>
                E-Commerce
              </span>
            </h1>
            <p className="hero-subtitle">
              Experience next-generation shopping with full observability, real-time analytics, 
              and unparalleled performance monitoring.
            </p>
            
            {isAuthenticated ? (
              <div style={{ marginBottom: 'var(--space-8)' }}>
                <h4 style={{ 
                  color: 'var(--neutral-700)', 
                  marginBottom: 'var(--space-4)',
                  fontWeight: '600'
                }}>
                  Welcome back, {user?.name || user?.email}! 👋
                </h4>
                <Link to="/products" className="btn-primary btn-xl animate-slide-in-right">
                  Continue Shopping
                  <i className="bi bi-arrow-right" style={{ marginLeft: 'var(--space-2)' }}></i>
                </Link>
              </div>
            ) : (
              <div style={{ 
                display: 'flex', 
                gap: 'var(--space-4)', 
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: 'var(--space-8)'
              }}>
                <Link to="/products" className="btn-primary btn-xl">
                  Shop Now
                  <i className="bi bi-bag" style={{ marginLeft: 'var(--space-2)' }}></i>
                </Link>
                <Link to="/register" className="btn-secondary btn-xl">
                  Create Account
                  <i className="bi bi-person-plus" style={{ marginLeft: 'var(--space-2)' }}></i>
                </Link>
              </div>
            )}

            {/* Hero Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: 'var(--space-8)',
              marginTop: 'var(--space-16)',
              maxWidth: '600px',
              margin: 'var(--space-16) auto 0'
            }}>
              <div className="text-center">
                <div style={{ 
                  fontSize: 'var(--text-3xl)', 
                  fontWeight: '800',
                  color: 'var(--text-accent)',
                  marginBottom: 'var(--space-1)'
                }}>
                  10K+
                </div>
                <div style={{ color: 'var(--text-accent-light)', fontSize: 'var(--text-sm)' }}>
                  Happy Customers
                </div>
              </div>
              <div className="text-center">
                <div style={{ 
                  fontSize: 'var(--text-3xl)', 
                  fontWeight: '800',
                  color: 'var(--text-accent)',
                  marginBottom: 'var(--space-1)'
                }}>
                  99.9%
                </div>
                <div style={{ color: 'var(--text-accent-light)', fontSize: 'var(--text-sm)' }}>
                  Uptime SLA
                </div>
              </div>
              <div className="text-center">
                <div style={{ 
                  fontSize: 'var(--text-3xl)', 
                  fontWeight: '800',
                  color: 'var(--text-accent)',
                  marginBottom: 'var(--space-1)'
                }}>
                  24/7
                </div>
                <div style={{ color: 'var(--text-accent-light)', fontSize: 'var(--text-sm)' }}>
                  Monitoring
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: 'var(--space-32) 0' }}>
        <div className="container-modern">
          <div className="text-center" style={{ marginBottom: 'var(--space-20)' }}>
            <h2 style={{ 
              fontSize: 'var(--text-5xl)', 
              fontWeight: '800',
              marginBottom: 'var(--space-6)',
              color: 'var(--text-accent-dark)'
            }}>
              Why Choose ObservaCart?
            </h2>
            <p style={{ 
              fontSize: 'var(--text-xl)', 
              color: 'var(--neutral-600)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Built with enterprise-grade observability and modern architecture
            </p>
          </div>

          <div className="grid-modern grid-3">
            <div className="card-modern text-center animate-fade-in-up">
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, var(--primary-100), var(--primary-200))',
                borderRadius: 'var(--radius-2xl)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-6)',
                border: '2px solid var(--primary-200)'
              }}>
                <i className="bi bi-lightning-charge" style={{ 
                  fontSize: 'var(--text-3xl)', 
                  color: 'var(--primary-600)' 
                }}></i>
              </div>
              <h3 style={{ 
                fontSize: 'var(--text-2xl)', 
                fontWeight: '700',
                marginBottom: 'var(--space-4)',
                color: 'var(--neutral-800)'
              }}>
                Lightning Fast
              </h3>
              <p style={{ 
                color: 'var(--neutral-600)', 
                lineHeight: '1.6',
                fontSize: 'var(--text-base)'
              }}>
                Optimized performance with real-time monitoring ensures sub-second response times 
                for the ultimate shopping experience.
              </p>
            </div>

            <div className="card-modern text-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, var(--success-50), var(--success-100))',
                borderRadius: 'var(--radius-2xl)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-6)',
                border: '2px solid var(--success-200)'
              }}>
                <i className="bi bi-shield-check" style={{ 
                  fontSize: 'var(--text-3xl)', 
                  color: 'var(--success-600)' 
                }}></i>
              </div>
              <h3 style={{ 
                fontSize: 'var(--text-2xl)', 
                fontWeight: '700',
                marginBottom: 'var(--space-4)',
                color: 'var(--neutral-800)'
              }}>
                Secure & Monitored
              </h3>
              <p style={{ 
                color: 'var(--neutral-600)', 
                lineHeight: '1.6',
                fontSize: 'var(--text-base)'
              }}>
                Enterprise-grade security with comprehensive observability. Every transaction 
                is protected and monitored in real-time.
              </p>
            </div>

            <div className="card-modern text-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, var(--warning-50), var(--warning-100))',
                borderRadius: 'var(--radius-2xl)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--space-6)',
                border: '2px solid var(--warning-200)'
              }}>
                <i className="bi bi-graph-up" style={{ 
                  fontSize: 'var(--text-3xl)', 
                  color: 'var(--warning-600)' 
                }}></i>
              </div>
              <h3 style={{ 
                fontSize: 'var(--text-2xl)', 
                fontWeight: '700',
                marginBottom: 'var(--space-4)',
                color: 'var(--neutral-800)'
              }}>
                Analytics-Driven
              </h3>
              <p style={{ 
                color: 'var(--neutral-600)', 
                lineHeight: '1.6',
                fontSize: 'var(--text-base)'
              }}>
                Powered by Grafana, Prometheus, and Jaeger for complete visibility 
                into performance, metrics, and distributed tracing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section style={{ 
        padding: 'var(--space-32) 0',
        background: 'linear-gradient(135deg, var(--neutral-50) 0%, white 100%)'
      }}>
        <div className="container-modern">
          <div className="text-center" style={{ marginBottom: 'var(--space-16)' }}>
            <h3 style={{ 
              fontSize: 'var(--text-3xl)', 
              fontWeight: '700',
              marginBottom: 'var(--space-4)',
              color: 'var(--text-accent-dark)'
            }}>
              Powered by Modern Technology
            </h3>
            <p style={{ color: 'var(--neutral-600)', fontSize: 'var(--text-lg)' }}>
              Built with industry-leading observability and monitoring tools
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-8)',
            alignItems: 'center'
          }}>
            {[
              { name: 'Grafana', icon: 'bi-bar-chart' },
              { name: 'Prometheus', icon: 'bi-speedometer2' },
              { name: 'Jaeger', icon: 'bi-diagram-3' },
              { name: 'OpenTelemetry', icon: 'bi-broadcast' },
              { name: 'Docker', icon: 'bi-box' },
              { name: 'React', icon: 'bi-code-slash' }
            ].map((tech, index) => (
              <div 
                key={tech.name}
                className="text-center"
                style={{
                  padding: 'var(--space-6)',
                  borderRadius: 'var(--radius-xl)',
                  transition: 'all var(--transition-normal)',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'white';
                  e.target.style.boxShadow = 'var(--shadow-lg)';
                  e.target.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <i className={tech.icon} style={{ 
                  fontSize: 'var(--text-3xl)', 
                  color: 'var(--primary-500)',
                  marginBottom: 'var(--space-3)',
                  display: 'block'
                }}></i>
                <span style={{ 
                  fontWeight: '600',
                  color: 'var(--neutral-700)',
                  fontSize: 'var(--text-sm)'
                }}>
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: 'var(--space-32) 0',
        background: 'var(--gradient-cta)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2322c55e\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat'
        }}></div>
        
        <div className="container-modern" style={{ position: 'relative', zIndex: 1 }}>
          <div className="text-center">
            <h2 style={{ 
              fontSize: 'var(--text-5xl)', 
              fontWeight: '800',
              marginBottom: 'var(--space-6)',
              lineHeight: '1.1',
              color: 'var(--text-accent)'
            }}>
              Ready to Experience the Future?
            </h2>
            <p style={{ 
              fontSize: 'var(--text-xl)', 
              marginBottom: 'var(--space-10)',
              maxWidth: '600px',
              margin: '0 auto var(--space-10)',
              color: 'var(--text-accent-light)'
            }}>
              Join thousands of customers who trust ObservaCart for their shopping needs
            </p>
            
            <div style={{ 
              display: 'flex', 
              gap: 'var(--space-4)', 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link 
                to="/products" 
                className="btn-modern btn-xl"
                style={{
                  background: 'white',
                  color: 'var(--text-accent-dark)',
                  fontWeight: '700'
                }}
              >
                Browse Products
                <i className="bi bi-arrow-right" style={{ marginLeft: 'var(--space-2)' }}></i>
              </Link>
              <Link 
                to="/register" 
                className="btn-modern btn-xl"
                style={{
                  background: 'transparent',
                  color: 'var(--text-accent)',
                  border: '2px solid var(--text-accent)'
                }}
              >
                Get Started Free
                <i className="bi bi-rocket" style={{ marginLeft: 'var(--space-2)' }}></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
