import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.style.colorScheme = 'dark';
  }, []);

  const weapons = [
    {
      name: 'AK-47',
      category: 'Rifle',
      damage: 36,
      price: '$2700',
      image: 'https://cdn.poehali.dev/projects/c729d77c-fe4e-4404-a540-239ebd4e6019/files/e02e3632-cf5d-424a-b474-839003a6d58f.jpg'
    },
    {
      name: 'AWP',
      category: 'Sniper',
      damage: 115,
      price: '$4750',
      image: 'https://cdn.poehali.dev/projects/c729d77c-fe4e-4404-a540-239ebd4e6019/files/e02e3632-cf5d-424a-b474-839003a6d58f.jpg'
    },
    {
      name: 'Desert Eagle',
      category: 'Pistol',
      damage: 53,
      price: '$700',
      image: 'https://cdn.poehali.dev/projects/c729d77c-fe4e-4404-a540-239ebd4e6019/files/e02e3632-cf5d-424a-b474-839003a6d58f.jpg'
    },
    {
      name: 'M4A4',
      category: 'Rifle',
      damage: 33,
      price: '$3100',
      image: 'https://cdn.poehali.dev/projects/c729d77c-fe4e-4404-a540-239ebd4e6019/files/e02e3632-cf5d-424a-b474-839003a6d58f.jpg'
    }
  ];

  const maps = [
    {
      name: 'Dust II',
      type: 'Desert',
      players: '5v5',
      image: 'https://cdn.poehali.dev/projects/c729d77c-fe4e-4404-a540-239ebd4e6019/files/156b7433-3a36-47a5-8b3f-3ca2b9e89be5.jpg'
    },
    {
      name: 'Inferno',
      type: 'Urban',
      players: '5v5',
      image: 'https://cdn.poehali.dev/projects/c729d77c-fe4e-4404-a540-239ebd4e6019/files/156b7433-3a36-47a5-8b3f-3ca2b9e89be5.jpg'
    },
    {
      name: 'Mirage',
      type: 'Desert',
      players: '5v5',
      image: 'https://cdn.poehali.dev/projects/c729d77c-fe4e-4404-a540-239ebd4e6019/files/156b7433-3a36-47a5-8b3f-3ca2b9e89be5.jpg'
    },
    {
      name: 'Nuke',
      type: 'Industrial',
      players: '5v5',
      image: 'https://cdn.poehali.dev/projects/c729d77c-fe4e-4404-a540-239ebd4e6019/files/156b7433-3a36-47a5-8b3f-3ca2b9e89be5.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Crosshair" className="text-primary" size={32} />
            <span className="text-2xl font-bold text-primary">CS:GO 2</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setActiveSection('home')}
              className={`text-sm uppercase transition-colors ${
                activeSection === 'home' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Главная
            </button>
            <button
              onClick={() => setActiveSection('weapons')}
              className={`text-sm uppercase transition-colors ${
                activeSection === 'weapons' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Оружие
            </button>
            <button
              onClick={() => setActiveSection('maps')}
              className={`text-sm uppercase transition-colors ${
                activeSection === 'maps' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Карты
            </button>
            <button
              onClick={() => setActiveSection('community')}
              className={`text-sm uppercase transition-colors ${
                activeSection === 'community' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Сообщество
            </button>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold glow-orange-hover">
            <Icon name="Download" size={18} className="mr-2" />
            Скачать
          </Button>
        </div>
      </nav>

      <main className="pt-16">
        {activeSection === 'home' && (
          <>
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://cdn.poehali.dev/projects/c729d77c-fe4e-4404-a540-239ebd4e6019/files/b7f9bc66-c694-48ec-aaf5-9470d4633667.jpg')`,
                  filter: 'brightness(0.4)'
                }}
              />
              <div className="relative z-10 text-center px-4 animate-fade-in">
                <h1 className="text-6xl md:text-8xl font-bold mb-6 text-foreground drop-shadow-2xl">
                  COUNTER-STRIKE
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Легендарный тактический шутер. Точность, стратегия, командная игра.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 glow-orange animate-pulse-glow"
                    onClick={() => navigate('/game')}
                  >
                    <Icon name="Play" size={20} className="mr-2" />
                    Играть сейчас
                  </Button>
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 font-bold text-lg px-8">
                    <Icon name="Info" size={20} className="mr-2" />
                    Узнать больше
                  </Button>
                </div>
              </div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <Icon name="ChevronDown" size={32} className="text-primary" />
              </div>
            </section>

            <section className="py-20 bg-card/50">
              <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-fade-in">
                  Особенности игры
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <Card className="bg-card border-border hover-scale glow-orange-hover">
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 flex justify-center">
                        <Icon name="Target" size={48} className="text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">Тактическая игра</h3>
                      <p className="text-muted-foreground">
                        Продумывайте каждый шаг. Работайте в команде. Побеждайте стратегией.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-card border-border hover-scale glow-orange-hover">
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 flex justify-center">
                        <Icon name="Swords" size={48} className="text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">Разнообразное оружие</h3>
                      <p className="text-muted-foreground">
                        Более 50 единиц вооружения. От пистолетов до снайперских винтовок.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-card border-border hover-scale glow-orange-hover">
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 flex justify-center">
                        <Icon name="Users" size={48} className="text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">Киберспорт</h3>
                      <p className="text-muted-foreground">
                        Участвуйте в турнирах. Смотрите профессиональные матчи. Развивайте навыки.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            <section className="py-20">
              <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="animate-slide-in-left">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                      Присоединяйся к миллионам игроков
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      Counter-Strike объединяет игроков по всему миру уже более 20 лет. 
                      Стань частью легендарного сообщества.
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <Icon name="CheckCircle2" className="text-primary mt-1" size={24} />
                        <span className="text-muted-foreground">Бесплатная игра для всех</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Icon name="CheckCircle2" className="text-primary mt-1" size={24} />
                        <span className="text-muted-foreground">Регулярные обновления и новый контент</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Icon name="CheckCircle2" className="text-primary mt-1" size={24} />
                        <span className="text-muted-foreground">Система рангов и достижений</span>
                      </li>
                    </ul>
                  </div>
                  <div className="relative animate-fade-in">
                    <img
                      src="https://cdn.poehali.dev/projects/c729d77c-fe4e-4404-a540-239ebd4e6019/files/b7f9bc66-c694-48ec-aaf5-9470d4633667.jpg"
                      alt="Gameplay"
                      className="rounded-lg shadow-2xl glow-orange"
                    />
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {activeSection === 'weapons' && (
          <section className="py-20 min-h-screen">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 animate-fade-in">
                Арсенал
              </h2>
              <p className="text-center text-muted-foreground mb-12 text-lg">
                Выбери свое оружие и доминируй на поле боя
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {weapons.map((weapon, index) => (
                  <Card
                    key={index}
                    className="bg-card border-border hover-scale glow-orange-hover overflow-hidden group animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={weapon.image}
                        alt={weapon.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                        {weapon.category}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-xl font-bold mb-2">{weapon.name}</h3>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Урон</span>
                        <span className="text-primary font-bold">{weapon.damage}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Цена</span>
                        <span className="text-foreground font-bold">{weapon.price}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeSection === 'maps' && (
          <section className="py-20 min-h-screen">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 animate-fade-in">
                Игровые карты
              </h2>
              <p className="text-center text-muted-foreground mb-12 text-lg">
                Изучи локации и стань мастером тактики
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                {maps.map((map, index) => (
                  <Card
                    key={index}
                    className="bg-card border-border hover-scale glow-orange-hover overflow-hidden group animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={map.image}
                        alt={map.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-3xl font-bold mb-2">{map.name}</h3>
                        <div className="flex gap-3">
                          <Badge className="bg-secondary text-secondary-foreground">
                            {map.type}
                          </Badge>
                          <Badge className="bg-primary text-primary-foreground">
                            <Icon name="Users" size={14} className="mr-1" />
                            {map.players}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeSection === 'community' && (
          <section className="py-20 min-h-screen">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 animate-fade-in">
                Сообщество
              </h2>
              <p className="text-center text-muted-foreground mb-12 text-lg">
                Присоединяйся и общайся с игроками со всего мира
              </p>
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  <Card className="bg-card border-border hover-scale glow-orange-hover">
                    <CardContent className="p-8 text-center">
                      <Icon name="MessageSquare" size={48} className="text-primary mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-3">Форум</h3>
                      <p className="text-muted-foreground mb-4">
                        Обсуждай стратегии, делись опытом, находи тиммейтов
                      </p>
                      <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                        Перейти на форум
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className="bg-card border-border hover-scale glow-orange-hover">
                    <CardContent className="p-8 text-center">
                      <Icon name="Tv" size={48} className="text-primary mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-3">Турниры</h3>
                      <p className="text-muted-foreground mb-4">
                        Смотри профессиональные матчи и участвуй в соревнованиях
                      </p>
                      <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                        Расписание турниров
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-card border-border">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6 text-center">Социальные сети</h3>
                    <div className="flex justify-center gap-4 flex-wrap">
                      <Button size="lg" variant="outline" className="border-border hover:border-primary">
                        <Icon name="Twitter" size={20} className="mr-2" />
                        Twitter
                      </Button>
                      <Button size="lg" variant="outline" className="border-border hover:border-primary">
                        <Icon name="Youtube" size={20} className="mr-2" />
                        YouTube
                      </Button>
                      <Button size="lg" variant="outline" className="border-border hover:border-primary">
                        <Icon name="MessageCircle" size={20} className="mr-2" />
                        Discord
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-card/50 border-t border-border py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Crosshair" className="text-primary" size={24} />
                <span className="text-xl font-bold text-primary">CS:GO 2</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Легендарный тактический шутер нового поколения
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-sm">Игра</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Новости</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Обновления</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Системные требования</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-sm">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Связаться с нами</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Правила игры</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-sm">Компания</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Карьера</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 CS:GO 2. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;