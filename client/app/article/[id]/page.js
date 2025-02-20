'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState, useMemo, useContext } from 'react' // Import useContext
import BreadcrumbDetail from './_components/breadcrumb-detail'
import TitleShareFontSize from './_components/title-share-fontSize'
import Content from './_components/content'
import Aside from './_components/aside'
import TagLikeShareBtn from './_components/tag-like-share-btn'
import ReplyInput from './_components/reply-input'
import Recommends from './_components/recommends'
import CommentsArea from './_components/comments-area'
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from './_components/content/index.module.scss' // 新增這行引入樣式

function getFontSize(size) {
  switch (size) {
    case 'small':
      return '14px'
    case 'medium':
      return '16px'
    case 'large':
      return '18px'
    default:
      return '16px'
  }
}

export default function ArticleDetail() {
  // ...其他 state 與 useEffect 程式碼保持不變
  const { id } = useParams()
  const [fontSize, setFontSize] = useState('medium')
  const [categoryName, setCategoryName] = useState('')
  const [articleTitle, setArticleTitle] = useState('')
  const [articleSubTitle, setArticleSubTitle] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const [imagePath, setImagePath] = useState('')
  const [articleContent, setArticleContent] = useState('<p>載入中...</p>')
  const [article, setArticle] = useState(null)
  const [categoryId, setCategoryId] = useState(null)
  const [tags, setTags] = useState([])
  const [refreshComments, setRefreshComments] = useState(0)

  const changeFontSize = (size) => {
    setFontSize(size)
  }

  useEffect(() => {
    // 初始化 AOS，設定全域配置
    AOS.init({
      duration: 300,           // 動畫持續時間
      easing: 'ease-out', // 動畫效果
      once: true,             // 動畫只執行一次
      offset: 50,             // 觸發距離
      delay: 100,             // 延遲時間
      anchorPlacement: 'center-center', // 動畫觸發位置
    });

    changeFontSize('medium')
    fetch(`http://localhost:8000/api/articles/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.status}`)
        }
        return res.json()
      })
      .then((response) => {
        console.log('Article response:', response)
        if (response.data && response.data.title) {
          setArticle(response.data)
          setArticleTitle(response.data.title)
          setArticleSubTitle(response.data.subtitle || '')
          setCreatedAt(response.data.created_at)
          setImagePath(response.data.image_path)
          setArticleContent(response.data.content)
          setCategoryId(response.data.category_id)
          setTags(response.data.tags)

          return fetch(`http://localhost:8000/api/articles/categories`)
            .then((res) => {
              if (!res.ok) {
                throw new Error(`Network response was not ok: ${res.status}`)
              }
              return res.json()
            })
            .then((categoriesResponse) => {
              console.log('Categories response:', categoriesResponse)
              const category = categoriesResponse.data.find(
                (cat) => cat.id === response.data.category_id
              )
              if (category) {
                setCategoryName(category.name)
              }
            })
        } else {
          console.error('Article data structure is incorrect:', response)
          throw new Error('Article data structure is incorrect')
        }
      })
      .catch((err) => {
        console.error('Fetch error:', err)
      })
  }, [id])

  useEffect(() => {
    if (articleContent) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(articleContent, 'text/html');
      const images = doc.getElementsByTagName('img');

      // 建立 IntersectionObserver
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.classList.add(styles['article-image-fade']);

              const handleLoad = () => {
                img.classList.add(styles['loaded']);
              };

              if (img.complete) {
                handleLoad();
              } else {
                img.addEventListener('load', handleLoad);
              }

              // 一旦觸發動畫就停止觀察
              observer.unobserve(img);
            }
          });
        },
        {
          threshold: 0.2, // 當圖片出現 10% 就觸發
          // rootMargin: '50px' // 提前 50px 觸發
        }
      );

      // 為每個圖片添加觀察
      Array.from(images).forEach(img => {
        observer.observe(img);
      });

      setArticleContent(doc.body.innerHTML);

      // 清理 observer
      return () => {
        observer.disconnect();
      };
    }
  }, [articleContent]);

  const memoizedTags = useMemo(() => tags, [tags])

  const handleCommentSubmitted = () => {
    setRefreshComments(prev => prev + 1)
  }

  return (
    <div className="bg-light headerPadding">
      <div className="d-flex flex-column min-vh-100 text-dark bg-light y-container">
        <section className="y-container title-main-img">
          {article && (
            <BreadcrumbDetail
              categoryName={categoryName}
              articleTitle={article.title}
              category_id={categoryId}
            />
          )}
          <TitleShareFontSize
            categoryName={categoryName}
            articleTitle={articleTitle}
            articleSubTitle={articleSubTitle}
            createdAt={createdAt}
            imagePath={imagePath}
          />
        </section>

        <div className="d-flex justify-content-between">
          <article className="y-article-content">
            <Content
              content={articleContent}
              fontSize={getFontSize(fontSize)}
            />
            <TagLikeShareBtn articleId={id} />
            <ReplyInput articleId={id} parentId={null} onCommentSubmitted={handleCommentSubmitted} />
            <CommentsArea articleId={id} refreshTrigger={refreshComments} />
          </article>
          <Aside
            categoryId={categoryId}
            tags={memoizedTags}
            title={articleTitle}
            content={articleContent}
            articleId={id} // 將 articleId 作為 prop 傳遞
          />
        </div>
      </div>
      <Recommends />
    </div>
  )
}
