from flask import Blueprint, request, jsonify
from models import Product
from flask_jwt_extended import jwt_required

chatbot_bp = Blueprint('chatbot', __name__)

@chatbot_bp.route('/chat', methods=['POST'])
@jwt_required()
def chat():
    query = request.get_json().get('message', '')
    products = Product.query.filter(Product.name.ilike(f'%{query}%')).limit(5).all()
    results = [{
        'name': p.name,
        'category': p.category,
        'price': p.price,
        'description': p.description,
         'image_url': p.image_url 
    } for p in products]
    return jsonify(results=results)

@chatbot_bp.route('/products', methods=['GET'])
def get_all_products():
    products = Product.query.all()
    return jsonify([{
        'name': p.name,
        'category': p.category,
        'price': p.price,
        'description': p.description,
         'image_url': p.image_url 
    } for p in products])
