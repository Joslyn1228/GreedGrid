from PIL import Image
import os
import sys

# 获取脚本所在目录
脚本_dir = os.path.dirname(os.path.abspath(__file__))
images_dir = os.path.join(脚本_dir, 'images')

# 设置压缩阈值（字节）
COMPRESSION_THRESHOLD = 50 * 1024  # 50KB
QUALITY = 85  # 压缩质量（1-100）

def compress_image(image_path):
    """压缩单个图片文件"""
    try:
        # 打开图片
        img = Image.open(image_path)
        
        # 保存原始尺寸和格式
        original_size = os.path.getsize(image_path)
        
        # 如果图片小于阈值，不压缩
        if original_size < COMPRESSION_THRESHOLD:
            print(f"跳过 {image_path} (已小于阈值: {original_size/1024:.2f}KB)")
            return
        
        # 压缩图片
        # 对于PNG，使用LZW压缩
        if img.format == 'PNG':
            img.save(image_path, optimize=True, compress_level=9)
        else:  # 对于JPEG和其他格式
            img.save(image_path, quality=QUALITY, optimize=True)
        
        # 计算压缩后的大小
        compressed_size = os.path.getsize(image_path)
        reduction = ((original_size - compressed_size) / original_size) * 100
        
        print(f"压缩 {image_path}")
        print(f"  原始大小: {original_size/1024:.2f}KB")
        print(f"  压缩后: {compressed_size/1024:.2f}KB")
        print(f"  减少了: {reduction:.2f}%")
        print()
        
    except Exception as e:
        print(f"压缩 {image_path} 时出错: {e}")
        print()

def main():
    """主函数，遍历所有图片文件并压缩"""
    print(f"开始压缩图片，阈值: {COMPRESSION_THRESHOLD/1024:.0f}KB")
    print(f"压缩质量: {QUALITY}")
    print("=" * 50)
    
    # 遍历所有子目录
    for root, dirs, files in os.walk(images_dir):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif')):
                file_path = os.path.join(root, file)
                compress_image(file_path)
    
    print("=" * 50)
    print("图片压缩完成！")

if __name__ == "__main__":
    main()
