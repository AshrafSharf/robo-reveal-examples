#!/bin/bash

# example.sh - Development script for running robo-reveal examples with hot reloading
# Usage: ./example.sh dev <example-name> [-p port] [-s slide]
# Example: ./example.sh dev graph-zoom-example
# Example: ./example.sh dev math -p 8000
# Example: ./example.sh dev overview -p 8000 -s 2

set -e

# Default configuration
DEFAULT_PORT=9000
MODE=""
EXAMPLE_NAME=""
PORT=$DEFAULT_PORT
SLIDE=""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to show usage
show_usage() {
    echo "Usage: $0 <mode> <example-name> [-p port] [-s slide]"
    echo ""
    echo "Modes:"
    echo "  dev     Start development server with hot reloading"
    echo ""
    echo "Arguments:"
    echo "  example-name   Name of the example file (without .html extension)"
    echo ""
    echo "Options:"
    echo "  -p port       Port number (default: $DEFAULT_PORT)"
    echo "  -s slide      Slide number to navigate to (0-indexed)"
    echo ""
    echo "Examples:"
    echo "  $0 dev math"
    echo "  $0 dev graph-zoom-example -p 8000"
    echo "  $0 dev overview -p 8000 -s 2"
    echo "  $0 dev layouts -s 1"
    echo ""
    echo "Available examples:"
    ls -1 *.html 2>/dev/null | sed 's/\.html$//' | sed 's/^/  /' || echo "  No HTML files found"
}

# Parse command line arguments
if [ $# -lt 2 ]; then
    print_error "Insufficient arguments provided"
    show_usage
    exit 1
fi

MODE=$1
EXAMPLE_NAME=$2

# Shift past the required arguments
shift 2

# Parse optional flags
while [[ $# -gt 0 ]]; do
    case $1 in
        -p|--port)
            PORT="$2"
            # Validate port is a number
            if ! [[ "$PORT" =~ ^[0-9]+$ ]]; then
                print_error "Port must be a number"
                exit 1
            fi
            shift 2
            ;;
        -s|--slide)
            SLIDE="$2"
            # Validate slide is a number
            if ! [[ "$SLIDE" =~ ^[0-9]+$ ]]; then
                print_error "Slide must be a number"
                exit 1
            fi
            shift 2
            ;;
        -h|--help)
            show_usage
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            show_usage
            exit 1
            ;;
    esac
done

# Validate mode
if [ "$MODE" != "dev" ]; then
    print_error "Unsupported mode: $MODE"
    print_info "Currently supported modes: dev"
    show_usage
    exit 1
fi

# Construct HTML file path
HTML_FILE="$EXAMPLE_NAME.html"

# Check if HTML file exists
if [ ! -f "$HTML_FILE" ]; then
    print_error "HTML file '$HTML_FILE' does not exist"
    print_info "Available examples:"
    ls -1 *.html 2>/dev/null | sed 's/\.html$//' | sed 's/^/  /' || echo "  No HTML files found"
    exit 1
fi

# Function to clear parcel cache
clear_parcel_cache() {
    print_info "Clearing Parcel cache..."
    rm -rf .parcel-cache dist
    print_info "Cache cleared"
}

# Function to free the port
free_port() {
    print_info "Checking for processes using port $PORT..."
    # Find and kill processes using the port
    local pids=$(lsof -ti :$PORT 2>/dev/null || true)
    if [ -n "$pids" ]; then
        print_warning "Found processes using port $PORT, terminating them..."
        echo "$pids" | xargs kill -9 2>/dev/null || true
        sleep 1
        print_info "Port $PORT freed"
    else
        print_info "Port $PORT is available"
    fi
}

# Function to run development mode
run_dev() {
    # Construct URL with optional slide navigation
    local url="http://localhost:$PORT"
    if [ -n "$SLIDE" ]; then
        url="$url#/$SLIDE"
        print_info "Starting development server for example: $EXAMPLE_NAME (slide $SLIDE)"
    else
        print_info "Starting development server for example: $EXAMPLE_NAME"
    fi
    
    print_info "HTML file: $HTML_FILE"
    print_info "Port: $PORT"
    print_info "URL: $url"
    echo ""
    
    # Check if parcel is available via npx
    if ! npx parcel --version &> /dev/null; then
        print_error "Parcel not found. Please install it with: npm install"
        exit 1
    fi
    
    # Clear cache and free port
    clear_parcel_cache
    free_port
    
    echo ""
    # Start parcel dev server
    print_info "Starting Parcel development server with hot reloading..."
    
    # Use custom open URL if slide specified, otherwise use parcel's --open
    if [ -n "$SLIDE" ]; then
        npx parcel "$HTML_FILE" --port "$PORT" &
        PARCEL_PID=$!
        
        # Wait for server to start and check if it's using our port
        print_info "Waiting for server to start on port $PORT..."
        for i in {1..10}; do
            if curl -s "http://localhost:$PORT" > /dev/null 2>&1; then
                print_info "Server is ready, opening browser to slide $SLIDE"
                open "$url"
                break
            fi
            sleep 1
        done
        
        # Wait for parcel process
        wait $PARCEL_PID
    else
        exec npx parcel "$HTML_FILE" --port "$PORT" --open
    fi
}

# Main execution
case "$MODE" in
    "dev")
        run_dev
        ;;
    *)
        print_error "Unknown mode: $MODE"
        show_usage
        exit 1
        ;;
esac