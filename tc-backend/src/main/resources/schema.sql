DROP DATABASE IF EXISTS tc_db;
CREATE DATABASE tc_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tc_db;

-- System User
CREATE TABLE sys_user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO sys_user (username, password) VALUES ('admin', '123456');

-- Category
CREATE TABLE category (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    sort_order INT DEFAULT 0,
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO category (name, description, sort_order) VALUES 
('工业传动', 'Industrial Drive', 1),
('航空航天', 'Aerospace', 2),
('医疗设备', 'Medical Equipment', 3),
('液压系统', 'Hydraulic System', 4),
('精密组件', 'Precision Components', 5);

-- Product
CREATE TABLE product (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    sku VARCHAR(50),
    category VARCHAR(50),
    price DECIMAL(10, 2),
    status VARCHAR(20) DEFAULT 'In Stock',
    image VARCHAR(255),
    description TEXT,
    specs JSON,
    is_featured BOOLEAN DEFAULT FALSE,
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert Products
INSERT INTO product (name, category, price, status, image, description, is_featured) VALUES 
('精密齿轮系列', '工业传动', 1200.00, 'In Stock', 'https://picsum.photos/seed/gear/600/450', '适用于汽车及工业传动', TRUE),
('航空铝合金结构件', '航空航天', 5000.00, 'In Stock', 'https://picsum.photos/seed/aero/600/450', '高强度轻量化航空设计', TRUE),
('医疗器械配件', '医疗设备', 800.00, 'In Stock', 'https://picsum.photos/seed/medical/600/450', '316L不锈钢高洁净材质', TRUE),
('液压阀块组件', '液压系统', 2300.00, 'In Stock', 'https://picsum.photos/seed/valve/600/450', '复杂流道高压测试', TRUE),
('高速数控主轴', '精密组件', 1240.00, 'In Stock', 'https://picsum.photos/seed/spindle/600/450', '高速加工中心主轴', FALSE),
('Z型机械臂执行器', '机器人技术', 8500.00, 'Low Stock', 'https://picsum.photos/seed/robot/600/450', '高精度机械臂', FALSE),
('精密齿轮箱 4 系列', '动力传动', 3200.00, 'Draft', 'https://picsum.photos/seed/gearbox/600/450', '大扭矩齿轮箱', FALSE),
('控制面板 CP-100', '电子元件', 550.00, 'In Stock', 'https://picsum.photos/seed/panel/600/450', '工业控制面板', FALSE),
('液压泵 H-20', '液压系统', 890.00, 'Out of Stock', 'https://picsum.photos/seed/pump/600/450', '高压液压泵', FALSE);


-- Content Items (Advantages, etc.)
CREATE TABLE content_item (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    section VARCHAR(50) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    image VARCHAR(255),
    sort_order INT DEFAULT 0
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO content_item (section, title, description, icon, sort_order) VALUES
('home_advantage', '精密制造', '引进德国进口加工中心，精度达到微米级。无论是复杂曲面还是微小孔径，都能精准把控。', 'straighten', 1),
('home_advantage', '品质保障', '通过ISO9001认证。从原材料入库到成品出厂，设立12道检测工序，层层把关。', 'security', 2),
('home_advantage', '先进技术', '拥有资深工程师团队和自动化生产线。支持从设计优化到成品制造的一站式服务。', 'smart_toy', 3),
('home_hero', '阿三大苏打实打实', '阿松大阿松发大苏打阿三', NULL, 0),
('global_config', '腾昌精密机械', 'TC Precision', 'precision_manufacturing', 0),
('about_hero', '啊实打实打算', '萨达萨达是', NULL, 0),
('about_intro', '公司简介', '腾昌精密机械成立于2005年，致力于为全球客户提供高精度的机械零部件加工服务。我们拥有先进的五轴加工中心、车铣复合机床等设备，以及一支经验丰富的工程师团队。', NULL, 1),
('about_mission', '企业使命', '以精湛工艺，驱动工业未来。', NULL, 2),
('about_vision', '企业愿景', '成为全球领先的精密制造解决方案提供商。', NULL, 3);

-- Customer Cases
CREATE TABLE customer_case (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    industry VARCHAR(50),
    description TEXT,
    image VARCHAR(255),
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO customer_case (title, industry, description, image) VALUES
('某知名汽车厂商变速箱齿轮优化', '汽车制造', '通过优化齿轮齿形，降低了30%的噪音，提升了传动效率。', 'https://picsum.photos/seed/car/600/450'),
('航空发动机叶片精密加工', '航空航天', '攻克了钛合金难加工问题，实现了叶片的高精度批量生产。', 'https://picsum.photos/seed/plane/600/450'),
('高端医疗机器人关节模组', '医疗器械', '为手术机器人提供高精度、低间隙的关节模组，确保手术精准度。', 'https://picsum.photos/seed/medrobot/600/450');


-- Inquiry (Contact Messages)
CREATE TABLE inquiry (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    phone VARCHAR(50),
    email VARCHAR(100),
    content TEXT,
    status VARCHAR(20) DEFAULT 'unread',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO inquiry (name, phone, email, content, status) VALUES 
('张经理', '13800138000', 'zhang@example.com', '咨询精密齿轮加工报价', 'unread'),
('李工', '13900139000', 'li@example.com', '寻求医疗器械配件长期合作', 'read');
