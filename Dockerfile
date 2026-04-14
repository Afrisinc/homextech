# Use a lightweight nginx image to serve static HTML
FROM nginx:alpine

# Copy all HTML files to the nginx document root
COPY *.html /usr/share/nginx/html/

# Copy CSS directory
COPY css /usr/share/nginx/html/css/

# Copy images directory
COPY images /usr/share/nginx/html/images/

# Expose port 5000
EXPOSE 5000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
