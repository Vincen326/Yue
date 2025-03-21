// rent-card

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { IoStar } from 'react-icons/io5'
import { FaRegCommentDots } from 'react-icons/fa'
import FavoriteButton from '../rent-favorite/page' // ✅ 引入收藏按鈕元件

export default function RentCard({ rental }) {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="col mb-2">
      <div
        className="k-card-2 position-relative w-100 border rounded-1 overflow-hidden"
        style={{ cursor: 'pointer' }}
        onClick={() => router.push(`/rental/${rental.id}`)} // ✅ 點擊後導向 [id] 頁面
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="position-absolute top-0 start-0 k-type-bg-2 text-white fw-bold py-1 px-4">
          {rental.category}
        </div>

        <div className="position-absolute top-0 end-0 fw-bold pt-2 pe-3 d-flex flex-column align-items-start" style={{ fontSize: '1.1rem' }}>
          <span className="k-warn-text">
            <IoStar className='k-star me-1' />{rental.average_rating}
          </span>
          <span className="ms k-main-text" >
            <FaRegCommentDots className='k-comment me-1' />{rental.total_reviews}
          </span>
        </div>

        <div className="mt-4">
          <img
            src={
              rental.images?.length > 1 && isHovered
                ? `/images/rental/${rental.images[1]}.png`
                : rental.images?.length > 0
                  ? `/images/rental/${rental.images[0]}.png`
                  : `/images/rental/test/Leica-Q3-0.png`
            }
            className="d-block mx-auto"
            style={{ width: '50%' }}
            alt={rental.name}
          />
        </div>
        <div className="pt-0 pe-3 pb-2 ps-4">
          <h3 className="fs-5 fw-bold">
            {rental.brand} {rental.name}
          </h3>
          <div className="d-flex justify-content-between align-items-center">
            <span className="fs-6 fw-semibold">
              NT$ {rental.fee.toLocaleString()} / 天
            </span>
            <FavoriteButton rentId={rental.id} rental={rental} />
          </div>
        </div>
      </div>
    </div>
  )
}
