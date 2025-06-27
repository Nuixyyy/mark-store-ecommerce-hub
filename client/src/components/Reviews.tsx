
import React, { useState } from 'react';
import { Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { FrontendReview, FrontendUser } from '@/lib/typeAdapters';

interface ReviewsProps {
  isOpen: boolean;
  onClose: () => void;
  reviews: FrontendReview[];
  onAddReview: (review: Omit<FrontendReview, 'id' | 'date'>) => void;
  user: FrontendUser | null;
}

const Reviews: React.FC<ReviewsProps> = ({ isOpen, onClose, reviews, onAddReview, user }) => {
  const [showAddReview, setShowAddReview] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    customerName: '',
    rating: 5,
    comment: ''
  });
  const { toast } = useToast();

  React.useEffect(() => {
    if (user && showAddReview) {
      setReviewForm(prev => ({
        ...prev,
        customerName: user.fullName
      }));
    }
  }, [user, showAddReview]);

  const handleAddReviewClick = () => {
    if (!user) {
      toast({
        title: "يرجى تسجيل الدخول أولاً",
        description: "يجب تسجيل الدخول لإضافة تقييم",
        variant: "destructive"
      });
      return;
    }
    setShowAddReview(true);
  };

  const handleSubmitReview = () => {
    if (!reviewForm.customerName.trim() || !reviewForm.comment.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول",
        variant: "destructive"
      });
      return;
    }

    onAddReview({
      customerName: reviewForm.customerName.trim(),
      rating: reviewForm.rating,
      comment: reviewForm.comment.trim()
    });

    setReviewForm({ customerName: user?.fullName || '', rating: 5, comment: '' });
    setShowAddReview(false);
    
    toast({
      title: "تم بنجاح",
      description: "تم إضافة التقييم بنجاح"
    });
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onRatingChange?.(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            disabled={!interactive}
          >
            <Star
              className={`h-5 w-5 ${
                star <= rating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-400'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl">تقييمات العملاء</DialogTitle>
              <Button
                onClick={handleAddReviewClick}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                إضافة تقييم
              </Button>
            </div>
          </DialogHeader>
          
          <ScrollArea className="max-h-[60vh] pr-4">
            {reviews.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                لا توجد تقييمات حالياً
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id} className="bg-gray-700 border-gray-600">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-white">{review.customerName}</h4>
                          <p className="text-gray-400 text-sm">{review.date}</p>
                        </div>
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-gray-300">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Add Review Dialog */}
      <Dialog open={showAddReview} onOpenChange={setShowAddReview}>
        <DialogContent className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 border-purple-600/50 text-white max-w-md rounded-3xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold mb-6">
              أضف تقييمك
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 pt-2">
            <div className="space-y-3">
              <Label htmlFor="customerName" className="text-white text-right block">
                اسمك
              </Label>
              <Input
                id="customerName"
                value={reviewForm.customerName}
                onChange={(e) => setReviewForm(prev => ({ ...prev, customerName: e.target.value }))}
                className="bg-purple-800/50 border-purple-600/50 text-white rounded-xl h-14 text-right px-4"
                placeholder="محمد"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-white text-right block">
                تقييمك
              </Label>
              <Textarea
                value={reviewForm.comment}
                onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                className="bg-purple-800/50 border-purple-600/50 text-white rounded-xl text-right px-4 py-4 min-h-[120px] resize-none"
                placeholder="Yuygy tf t jtft"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-white text-right block">
                التقييم (1-5)
              </Label>
              <Input
                type="number"
                min="1"
                max="5"
                value={reviewForm.rating}
                onChange={(e) => setReviewForm(prev => ({ ...prev, rating: parseInt(e.target.value) || 1 }))}
                className="bg-purple-800/50 border-purple-600/50 text-white rounded-xl h-14 text-right px-4"
                placeholder="5"
              />
            </div>

            <Button 
              onClick={handleSubmitReview}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl h-14 text-lg font-semibold shadow-lg"
            >
              إرسال التقييم
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Reviews;
